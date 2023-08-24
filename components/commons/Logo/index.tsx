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
            <img className={styles.image}
                 src={'/logo.svg'}
                 alt={'Space'}
            />
        </Link>
    );
};

export default Logo;
