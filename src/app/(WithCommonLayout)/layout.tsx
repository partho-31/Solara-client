import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import React from 'react';

const Commonlayout = ({children} : {children : React.ReactNode}) => {
    return (
        <div>
            <Navbar/>
            {children}
            <Footer />
        </div>
    );
};

export default Commonlayout;