import React from 'react';
import Blog from '../Components/Blogs/Blog';
import PageTitle from '../Components/Shared/PageTitle';

const Blogs = () => {
    return (
        <>
        <PageTitle title='Blogs'></PageTitle>
            <Blog />
        </>
    );
};

export default Blogs;