import React, { createElement, HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

interface IProps extends HTMLAttributes<HTMLHeadingElement> {
    level: 1 | 2 | 3 | 4 | 5;
}

const Title: React.FC<IProps> = ({ level, className, children, ...props }) => {
    return createElement(`h${level}`, {
        className: cn({
            [styles.title1]: level === 1,
            [styles.title2]: level === 2,
            [styles.title3]: level === 3,
            [styles.title4]: level === 4,
            [styles.title5]: level === 5,
        }, className),
        ...props
    }, children);
};

export default Title;
