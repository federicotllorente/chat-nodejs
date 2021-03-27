import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonLoader = () => {
    return (
        <React.Fragment>
            <div className="skeleton__header">
                <h1><Skeleton /></h1>
                <h2><Skeleton /></h2>
                <p><Skeleton /></p>
            </div>
            <div className="skeleton__body">
                <div className="skeleton__body__element">
                    <p><Skeleton /></p>
                    <p><Skeleton /></p>
                </div>
                <div className="skeleton__body__element">
                    <p><Skeleton /></p>
                    <p><Skeleton /></p>
                </div>
                <div className="skeleton__body__element">
                    <p><Skeleton /></p>
                    <p><Skeleton /></p>
                </div>
            </div>
        </React.Fragment>
    );
};

export default SkeletonLoader;