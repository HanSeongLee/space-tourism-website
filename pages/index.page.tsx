import type { NextPage } from 'next'
import styles from './style.module.scss';
import { Paragraph, Title } from 'components/commons/Typography';
import Header from 'components/commons/Header';
import Container from 'components/commons/Container';
import Button from 'components/commons/Button';
import Link from 'next/link';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const Home: NextPage = () => {
    const root = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const timeline = gsap.timeline();

            timeline
                .delay(0.1)
                .fromTo('#overlay', {
                    opacity: 0.8,
                }, {
                    opacity: 0,
                })
                .fromTo('#subtitle', {
                    opacity: 0,
                    transform: 'translateY(-30px)',
                }, {
                    opacity: 1,
                    transform: 'translateY(0)',
                }, '+=0')
                .fromTo('#title', {
                    opacity: 0,
                    transform: 'translateY(-30px)',
                }, {
                    opacity: 1,
                    transform: 'translateY(0)',
                }, '+=0')
                .fromTo('#description', {
                    opacity: 0,
                    transform: 'translateY(-30px)',
                }, {
                    opacity: 1,
                    transform: 'translateY(0)',
                }, '+=0')
                .fromTo('#button', {
                    opacity: 0,
                    transform: 'translateY(30px)',
                }, {
                    opacity: 1,
                    transform: 'translateY(0)',
                }, '+=0');
        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <div className={styles.layout}
             ref={root}
        >
            <Header />
            <div className={styles.overlay}
                 id={'overlay'}
            ></div>
            <main className={styles.main}>
                <section className={styles.heroSection}>
                    <Container className={styles.container}>
                        <div className={styles.content}>
                            <Title className={styles.subtitle}
                                   level={5}
                                   id={'subtitle'}
                            >
                                So, you want to travel to
                            </Title>
                            <Title level={1}
                                   id={'title'}
                            >
                                Space
                            </Title>
                            <Paragraph className={styles.description}
                                       id={'description'}
                            >
                                Let’s face it; if you want to go to space, you might as well genuinely go to outer space
                                and
                                not hover kind of on the edge of it. Well sit back, and relax because we’ll give you a
                                truly
                                out of this world experience!
                            </Paragraph>
                        </div>

                        <div className={styles.buttonContainer}>
                            <Link href={'/destinations'}
                                  id={'button'}
                            >
                                <Button>
                                    Explore
                                </Button>
                            </Link>
                        </div>
                    </Container>
                </section>
            </main>
        </div>
    );
}

export default Home
