import { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { styled, Box, Typography, Grid } from '@mui/material';
import { LoginContext } from '../../context/ContextProvider';
import ProductDetail from './ProductDetail';
import ActionItem from './ActionItem';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../service/api';
import { useDispatch, useSelector } from 'react-redux';

import { getProductDetails } from '../../redux/actions/productActions';

const Component = styled(Box)`
    margin-top: 55px;
    background: #F2F2F2;
`;

const Container = styled(Grid)(({ theme }) => ({
    background: '#FFFFFF',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}))

const RightContainer = styled(Grid)`
    margin-top: 50px;
    & > p {
        margin-top: 10px;
    }
`;

const DetailView = () => {
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'
    const { account, setAccount } = useContext(LoginContext);
    const { id } = useParams();

    const { loading, product } = useSelector(state => state.getProductDetails);

    const dispatch = useDispatch();
    const sendLogdetails= async ()=>{
        if(!account){
            return;
        }
        console.log("hello")
        const result = await axios.post('https://flipkartgrid-backend.glitch.me/logs/addItemInLogs',{
            'username':account,
            'productid':id
        })
    }
    useEffect(() => {
        if(product && id !== product.id){
            dispatch(getProductDetails(id));
            console.log("account",account)
            // sendLogdetails()
        }   
    }, [dispatch, product, id, loading]);
    useEffect(()=>{
        sendLogdetails();
    },[])
    return (
        <Component>
            <Box></Box>
            { product && Object.keys(product).length &&
                <Container container> 
                    <Grid item lg={4} md={4} sm={8} xs={12}>
                        <ActionItem product={product} />
                    </Grid>
                    <RightContainer item lg={8} md={8} sm={8} xs={12}>
                        <Typography>{product.title.longTitle}</Typography>
                        <Typography style={{marginTop: 5, color: '#878787', fontSize: 14 }}>
                            8 Ratings & 1 Reviews
                            <span><img src={fassured} style={{width: 77, marginLeft: 20}} /></span>
                        </Typography>
                        <Typography>
                            <span style={{ fontSize: 28 }}>₹{product.price.cost}</span>&nbsp;&nbsp;&nbsp; 
                            <span style={{ color: '#878787' }}><strike>₹{product.price.mrp}</strike></span>&nbsp;&nbsp;&nbsp;
                            <span style={{ color: '#388E3C' }}>{product.price.discount} off</span>
                        </Typography>
                        <ProductDetail product={product} />
                    </RightContainer>
                </Container>
            }   
        </Component>
    )
}

export default DetailView;