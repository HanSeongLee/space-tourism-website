import React, { AnchorHTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import Link from 'next/link';

interface IProps extends AnchorHTMLAttributes<HTMLAnchorElement> {

}

const Logo: React.FC<IProps> = ({ className, ...props }) => {
    return (
        <Link className={cn(styles.logo, className)}
              href={'/'}
              {...props}
        >
            <h1>
                <img className={styles.image}
                     src={'/logo.svg'}
                     alt={'Space'}
                />
            </h1>
        </Link>
    );
};

export default Logo;
