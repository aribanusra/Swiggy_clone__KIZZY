import React from 'react';

const ShimmerMenu = () => {
    return (
        <>
            <div className="w-full mx-auto">
                <div className="w-full mx-10 sm:mx-52 h-[100vh]">
                    <div className="w-[70%] h-2 bg-gray-100 mt-8 shimmer"></div>
                    <div className="w-[20%] h-2 bg-gray-100 my-3 shimmer"></div>

                    <div className="w-full sm:w-[70%]  py-6 flex flex-wrap gap-10">
                        {Array(12)
                            .fill("")
                            .map((data, i) => (
                                <div key={i}>
                                    <div key={i} className="w-[295px] animate h-[182px]  rounded-md"></div>
                                    <div className="w-[20%] h-2 bg-gray-100 my-3 shimmer"></div>
                                    <div className="w-[15%] h-2 bg-gray-100 my-3 shimmer"></div>
                                    <div className="w-[10%] h-2 bg-gray-100 my-3 shimmer"></div>
                                    </div>


                            ))}

                    </div>
                </div>
            </div>
        </>
    );
};

export default ShimmerMenu;
