import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import Container from 'components/commons/Container';
import Logo from 'components/commons/Logo';
import Menu from 'components/commons/Menu';
import { useScrollPosition } from 'libs/useScrollPosition';

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const Header: React.FC<IProps> = ({ className, ...props }) => {
    const scrollPosition = useScrollPosition();

    return (
        <header className={cn(styles.header, {
            [styles.background]: scrollPosition.y > 24,
        }, className)}
                {...props}
        >
            <Container className={styles.container}>
                <Logo />

                <Menu items={[{
                    label: 'Home',
                    href: '/',
                }, {
                    label: 'Destination',
                    href: '/destinations',
                }, {
                    label: 'Crew',
                    href: '/crews',
                }, {
                    label: 'Technology',
                    href: '/technologies',
                }]} />
            </Container>
        </header>
    );
};

export default Header;
