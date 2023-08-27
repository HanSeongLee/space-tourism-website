import React, { ElementType } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

interface IProps<T extends ElementType = 'button' | 'a'> {
    as?: T;
    variant?: 'primary' | 'icon' | 'link';
    icon?: 'hamburger' | 'close';
    className?: string;
    href?: string;
    onClick?: () => void;
    alt?: string;
}

const Button: React.FC<IProps> = ({
                                      as = 'button', variant = 'primary', icon, className,
                                      children, ...props
                                  }) => {
    return React.createElement(
        as,
        {
            className: cn(styles.button, {
                [styles.primary]: variant === 'primary',
                [styles.icon]: variant === 'icon',
                [styles.link]: variant === 'link',
            }, className),
            children: (
                <>
                    {children}
                    {icon && (
                        <img className={styles.iconImage}
                             src={`/icons/icon-${icon}.svg`}
                             alt={''}
                        />
                    )}
                </>
            ),
            ...props,
        },
    );
};

export default Button;
