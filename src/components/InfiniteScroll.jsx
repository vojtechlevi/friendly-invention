import React, { useRef, useEffect } from 'react';

const InfiniteScroll = ({ loadMore, loading }) => {
    const observerRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !loading) {
                    loadMore();
                }
            },
            { threshold: 1.0 }
        );
        if (observerRef.current) observer.observe(observerRef.current);
        return () => observer.disconnect();
    }, [loading, loadMore]);

    return <div ref={observerRef} className="h-10"></div>;
};

export default InfiniteScroll;