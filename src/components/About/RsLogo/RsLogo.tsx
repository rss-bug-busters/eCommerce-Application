import { FC } from 'react';
import { Link } from 'react-router-dom';

const RsLogo: FC = function () {
  return (
    <div className="absolute right-8 top-20 flex w-32 max-w-fit gap-2 transition duration-300 before:absolute before:bottom-0 before:right-0 before:h-0.5 before:w-0 before:bg-[#000000] before:transition-[width] before:duration-[0.6s] before:ease-[cubic-bezier(0.25,1,0.5,1)] before:content-[''] hover:before:left-0 hover:before:right-auto hover:before:w-full">
      <Link to="https://rs.school/">
        <img
          src="https://sun9-29.userapi.com/impg/EOjDAtXt9d7jGbN4cxOy9oIFMxHqFSbNfp-VJA/3kBXuuOxMwU.jpg?size=604x297&quality=96&sign=432bcf0f2961062b1dfe4b29ca433950&type=album"
          alt="RSLOGO"
          className="rounded-lg"
        />
      </Link>
    </div>
  );
};

export default RsLogo;
