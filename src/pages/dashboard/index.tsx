import { useEffect } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import User from "@/components/User/User";
import Head from "next/head";

const Dashboard = () => {

    useEffect(() => {
        if(localStorage.getItem("UserData") === null){
            window.open('/','_self');
        }
    },[]);

    return (
        <>
            <Head>
                <title>Dashboard</title>
                <meta name="description" content="Card91 Web Application" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header/>
            <User/>
            <Footer/>
        </>
    )
}

export default Dashboard;