import React from 'react'
import Navbar from './Navbar' // Adjust the path as necessary

import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
        </>

    )
}

export default Layout