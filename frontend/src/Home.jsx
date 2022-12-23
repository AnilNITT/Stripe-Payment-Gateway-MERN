import React from 'react'
import { Box, Stack } from "@chakra-ui/react"
import Card from './Card'
import axios from "axios";


const Home = () => {

    const checkoutHandler = async (amount) => {
        
        const { data: { key } } = await axios.get("http://www.localhost:4000/api/getkey")

        
        const { data: { order } } = await axios.post("http://localhost:4000/api/checkout", {
            amount
        })
        
        const options = {
            key,
            amount: order.amount,
            currency: "INR",
            name: "Anil Patidar",
            description: "Tutorial of RazorPay",
            image: "https://raw.githubusercontent.com/AnilNITT/AnilNITT/master/image/IMG_20220914_140541_163-modified.png",
            order_id: order.id,
            callback_url: "http://localhost:4000/api/paymentverification",
            prefill: {
                name: "Anil Patidar",
                email: "Anil.Patidar@example.com",
                contact: "9999999999"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#121212"
            }
        };

        const razor = new window.Razorpay(options);
        razor.open();
    }

    return (
        <Box>

            <Stack h={"100vh"} alignItems="center" justifyContent="center" direction={["column", "row"]}>

                <Card   amount={100} 
                        img={"https://cdn.shopify.com/s/files/1/1684/4603/products/MacBookPro13_Mid2012_NonRetina_Silver.png"} 
                        checkoutHandler={checkoutHandler} 
                />

                <Card 
                        amount={200} 
                        img={"http://i1.adis.ws/i/canon/eos-r5_front_rf24-105mmf4lisusm_32c26ad194234d42b3cd9e582a21c99b"} 
                        checkoutHandler={checkoutHandler} 
                />

            </Stack>

        </Box>
    )
}

export default Home