import type { NextPage } from 'next'
import styles from './style.module.scss';
import { Paragraph, Title } from 'components/commons/Typography';
import Header from 'components/commons/Header';
import Container from 'components/commons/Container';
import Button from 'components/commons/Button';
import Link from 'next/link';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { createMatchMedia } from 'libs/breakpoints';

const Home: NextPage = () => {
    const root = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = createMatchMedia(() => {
            gsap.set('#overlay', {
                autoAlpha: 0.8,
            });

            gsap.set(['#subtitle', '#title', '#description', '#buttonContainer'], {
                autoAlpha: 0,
            });

            gsap.timeline()
                .delay(0.1)
                .to('#overlay', {
                    autoAlpha: 0,
                })
                .fromTo('#subtitle', {
                    y: -30,
                }, {
                    y: 0,
                    autoAlpha: 1,
                }, '+=0')
                .fromTo('#title', {
                    y: -30,
                }, {
                    y: 0,
                    autoAlpha: 1,
                }, '+=0')
                .fromTo('#description', {
                    y: -30,
                }, {
                    y: 0,
                    autoAlpha: 1,
                }, '+=0')
                .fromTo('#buttonContainer', {
                    y: 30,
                }, {
                    y: 0,
                    autoAlpha: 1,
                }, '+=0');
        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <div className={styles.layout}
             ref={root}
        >
            <div className={styles.overlay}
                 id={'overlay'}
            ></div>
            <Header />
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

                        <div className={styles.buttonContainer}
                             id={'buttonContainer'}
                        >
                            <Link href={'/destinations'}>
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
