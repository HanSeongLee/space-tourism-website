import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import Link from 'next/link';

interface IProps extends HTMLAttributes<HTMLUListElement>{
    type?: 'default' | 'dot' | 'number';
    items: ITabsItem[];
    activeTabIndex: number;
}

const Tabs: React.FC<IProps> = ({
                                    type = 'default', items, activeTabIndex, className,
                                    ...props
                                }) => {
    return (
        <ul className={cn(styles.tabs, {
            [styles.dot]: type === 'dot',
            [styles.number]: type === 'number',
        }, className)}
            style={{
                '--active-tab-index': activeTabIndex,
            } as React.CSSProperties}
            {...props}
        >
            {items.map((item, index) => (
                <li className={cn(styles.item, {
                    [styles.active]: activeTabIndex === index,
                })}
                    key={index}
                >
                    <Link href={item.href}>
                        {type === 'default' && item.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default Tabs;
