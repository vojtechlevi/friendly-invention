import React from 'react';

const ImageGallery = ({ images }) => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {images.map((image) => (
                <div
                    key={image.id}
                    className="relative group overflow-hidden rounded-lg shadow-lg"
                >
                    <img
                        src={image.urls.small}
                        alt={image.alt_description}
                        className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-sm font-medium">
                            {image.user.name}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ImageGallery;