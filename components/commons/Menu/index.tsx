import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import Link from 'next/link';
import Button from 'components/commons/Button';
import { useRouter } from 'next/router';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    items: IMenuItem[];
}

const Menu: React.FC<IProps> = ({ items, className, ...props }) => {
    const { pathname } = useRouter();
    const firstPathname = pathname.split('/')[1];
    const [open, setOpen] = React.useState<boolean>(false);

    const handleMenuItemClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const link = e.currentTarget.querySelector('a');
        if (!link) {
            return ;
        }

        link.click();
    };

    const onMenuButtonClick = () => {
        setOpen(!open);
    };

    return (
        <nav className={cn(styles.menu, {
            [styles.open]: open,
        }, className)}
             {...props}
        >
            <div className={styles.backdrop}
                 onClick={onMenuButtonClick}
            ></div>
            <div className={styles.menuListWrapper}>
                <div className={styles.buttonContainer}>
                    <Button variant={'icon'}
                            icon={'close'}
                            alt={'Close'}
                            onClick={onMenuButtonClick}
                    />
                </div>
                <ol className={styles.menuList}>
                    {items.map((item, index) => (
                        <li className={cn(styles.item, {
                            [styles.active]: firstPathname === item.href.split('/')[1],
                        })}
                            onClick={handleMenuItemClick}
                            key={index}
                        >
                            <Link href={item.href}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ol>
            </div>
            <Button className={styles.menuButton}
                    variant={'icon'}
                    icon={'hamburger'}
                    alt={'Menu'}
                    onClick={onMenuButtonClick}
            />
        </nav>
    );
};

export default Menu;
