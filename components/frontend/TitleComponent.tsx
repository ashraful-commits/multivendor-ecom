import React from 'react';
import Link from 'next/link';
import { UrlObject } from 'url';

interface TitleComponentProps {
    title?: string;
    link?: string | UrlObject;
    className?: string;
}

const TitleComponent = ({ title, link, className }:TitleComponentProps) => {
    return (
        <div className={`container-fluid md:container lg:container ${className}`}>
            <h2 className="font-bold text-lg">{title}</h2>
            {link && typeof link === 'string' ? (
                <Link href={link} className="font-bold text-md">
                    view all
                </Link>
            ) : null}
        </div>
    );
};

export default TitleComponent;
