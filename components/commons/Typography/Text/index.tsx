import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

interface IProps extends HTMLAttributes<HTMLSpanElement> {
    type: 'subtitle1' | 'subtitle2' | 'nav' | 'bullet';
}

const Text: React.FC<IProps> = ({ type, className, children, ...props }) => {
    return (
        <span className={cn({
            [styles.subtitle1]: type === 'subtitle1',
            [styles.subtitle2]: type === 'subtitle2',
            [styles.nav]: type === 'nav',
            [styles.bullet]: type === 'bullet',
        }, className)}
              {...props}
        >
            {children}
        </span>
    );
};

export default Text;
