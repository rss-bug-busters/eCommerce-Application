import React from 'react';
import { Link } from 'react-router-dom';

interface LinkListProperties {
  links: {
    link: string;
    name: string;
    svg?: React.ReactNode;
    target?: '_blank' | '_self' | '_parent' | '_top';
  }[];
  title: string;
}

function LinkList({ title, links }: LinkListProperties) {
  return (
    <div>
      <h6 className="mb-4 flex font-semibold uppercase justify-center md:justify-start">
        {title}
      </h6>
      {links.map((link) => (
        <Link
          to={link.link}
          aria-label={link.name}
          key={link.name}
          target={link.target ?? '_self'}
        >
          <p className="mb-4 items-center justify-center flex md:justify-start hover:underline">
            {link.svg && <span className="me-3 [&>svg]:h-5 [&>svg]:w-5">{link.svg}</span>}
            {link.name}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default LinkList;
