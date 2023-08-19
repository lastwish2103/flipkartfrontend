import React,  { useEffect ,useState,useContext} from 'react';
import axios from 'axios'
import { Box, styled } from '@mui/material';

import NavBar from './Home/NarBar';
import Banner from './Home/Banner';
import MidSlide from './Home/MidSlide';
import MidSection from './Home/MidSection';
import Slide from './Home/Slide';
import { LoginContext } from '../context/ContextProvider';
import { useSelector, useDispatch } from 'react-redux'; // hooks
import { getProducts as listProducts } from '../redux/actions/productActions';

const Component = styled(Box)`
    padding: 20px 10px;
    background: #F2F2F2;
`;

const Home = () => {
    const getProducts = useSelector(state => state.getProducts);
    const { products, error } = getProducts;

    const dispatch = useDispatch();
    const [recommnededProducts, setRecommnededProducts] = useState([]);
    const [topSelectionProducts, setTopSelectionProducts] = useState([]);
    const getTopProducts = async() => {
        try{
        let result1 = await fetch('https://flipkart-backend-ksop.onrender.com/products/10');
        result1=await result1.json()
        setTopSelectionProducts(result1.data);
        getRecoomendedProducts(result1.data[0].id)
        } catch(e) {
            console.log(e.message);
        }
    }
    const getRecoomendedProducts = async(id) => {
        try{
        if(account){
        let result1 = await fetch(`https://flipkart-backend-ksop.onrender.com/products/recent/${account}/10`);
        result1=await result1.json()
        setRecommnededProducts(result1.data);
        } else {
        // let id = recommnededProducts[0].id
        let result1 = await fetch(`https://flipkart-backend-ksop.onrender.com/products/similar/${id}`);
        result1=await result1.json()
        setRecommnededProducts(result1.data);
        } }catch(e) {
            console.log(e.message);
            
        }
    }

    const { account } = useContext(LoginContext);
    useEffect(() => {
        dispatch(listProducts())
        getTopProducts()
    }, [dispatch])

    return (
        <>
            <NavBar />
            <Component>
                <Banner />
                <MidSlide products={products} />
                <MidSection />
                <Slide
                    data={products} 
                    title='Discounts for You'
                    timer={false} 
                    multi={true} 
                />
                <Slide
                    data={recommnededProducts} 
                    title='Recommended Items'
                    timer={false} 
                    multi={true} 
                />
                <Slide
                    data={topSelectionProducts} 
                    title='Top Selection'
                    timer={false} 
                    multi={true} 
                />
            </Component>
        </>
    )
}

export default Home;