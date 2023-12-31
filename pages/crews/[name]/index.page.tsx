import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import styles from './style.module.scss';
import { Paragraph, Title } from 'components/commons/Typography';
import Header from 'components/commons/Header';
import Container from 'components/commons/Container';
import data from 'data/data.json';
import Tabs from 'components/commons/Tabs';
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { createMatchMedia } from 'libs/breakpoints';
import cn from 'classnames';

interface ICrew {
    name: string;
    images: {
        webp: string;
        png: string;
    };
    role: string;
    bio: string;
}

const CrewPage = ({ crewNames, crew }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const root = useRef<HTMLDivElement>(null);
    const tabTimeline = useRef<gsap.core.Timeline>();
    const [initialLoad, setInitialLoad] = React.useState(true);
    const [imageLoaded, setImageLoaded] = React.useState(false);

    useLayoutEffect(() => {
        const ctx = createMatchMedia((context) => {
            const { isMobile, isDesktop } = context.conditions as { isMobile: boolean, isDesktop: boolean };

            gsap.set('#overlay', {
                autoAlpha: 0.8,
            });

            gsap.set(['#subtitle', '#imageWrapper', '#textContainer', '#tabs'], {
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
                })
                .add("start")
                .fromTo('#imageWrapper', {
                    x: isDesktop ? 30 : 0,
                    y: !isDesktop ? (isMobile ? -30 : 30) : 0,
                }, {
                    x: 0,
                    y: 0,
                    autoAlpha: 1,
                }, `${!isMobile ? 'last' : 'start'}`)
                .fromTo('#textContainer', {
                    x: isDesktop ? -30 : 0,
                    y: !isDesktop ? -30 : 0,
                }, {
                    x: 0,
                    y: 0,
                    autoAlpha: 1,
                }, `${!isMobile ? 'last-=0.5' : 'start+=0.5'}`)
                .fromTo('#tabs', {
                    x: isDesktop ? -30 : 0,
                    y: !isDesktop ? -30 : 0,
                }, {
                    x: 0,
                    y: 0,
                    autoAlpha: 1,
                }, `${!isMobile ? 'last-=0.5' : 'start+=0.5'}`)
                .add("last")
            ;

            tabTimeline.current = gsap.timeline({
                paused: true,
            })
                .add('start')
                .fromTo('#imageWrapper', {
                    x: isDesktop ? 30 : 0,
                    y: !isDesktop ? 30 : 0,
                }, {
                    x: 0,
                    y: 0,
                    autoAlpha: 1,
                }, `${!isMobile ? 'start+=0.5' : ''}`)
                .fromTo('#textContainer', {
                    x: isDesktop ? -30 : 0,
                    y: !isDesktop ? -30 : 0,
                }, {
                    x: 0,
                    y: 0,
                    autoAlpha: 1,
                }, `${!isMobile ? '' : 'start'}`)
            ;

        }, [root]);

        setInitialLoad(false);

        return () => {
            tabTimeline.current?.kill();
            ctx.revert();
        }
    }, []);

    useLayoutEffect(() => {
        if (initialLoad || !imageLoaded) {
            return;
        }

        tabTimeline.current?.restart();
    }, [initialLoad, imageLoaded]);

    const onClickTabItem = () => {
        setImageLoaded(false);
        gsap.set(['#imageWrapper', '#textContainer'], {
            autoAlpha: 0,
        });
    };

    const onImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <div className={cn(styles.layout, {
            [styles.load]: !initialLoad,
        })}
             ref={root}
        >
            <div className={styles.overlay}
                 id={'overlay'}
            ></div>
            <Header />
            <main className={styles.main}>
                <section className={styles.heroSection}>
                    <Container className={styles.container}>
                        <div className={styles.subtitle}
                             id={'subtitle'}
                        >
                            <Title className={styles.number}
                                   level={5}
                            >
                                02
                            </Title>
                            <Title level={5}>
                                Meet your crew
                            </Title>
                        </div>

                        <div className={styles.content}>
                            <div className={styles.imageWrapper}
                                 id={'imageWrapper'}
                            >
                                <img className={styles.image}
                                     src={crew.images.webp}
                                     alt={''}
                                     onLoad={onImageLoad}
                                />
                            </div>

                            <Tabs className={styles.tabs}
                                  type={'dot'}
                                  items={crewNames.map((name) => {
                                      return {
                                          label: name,
                                          href: `/crews/${name.toLowerCase().replace(' ', '-')}`,
                                      };
                                  })}
                                  activeTabIndex={crewNames.indexOf(crew.name)}
                                  onClickItem={onClickTabItem}
                                  id={'tabs'}
                            />

                            <div className={styles.textContainer}
                                 id={'textContainer'}
                            >
                                <Title className={styles.role}
                                       level={4}
                                >
                                    {crew.role}
                                </Title>
                                <Title className={styles.name}
                                       level={3}
                                >
                                    {crew.name}
                                </Title>

                                <Paragraph className={styles.bio}>
                                    {crew.bio}
                                </Paragraph>
                            </div>
                        </div>
                    </Container>
                </section>
            </main>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = data.crew.map(({ name }: { name: string }) => ({
        params: {
            name: name.toLowerCase().replace(' ', '-'),
        },
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<{
    crewNames: string[];
    crew: ICrew;
}> = async ({ params }) => {
    if (!params?.name) {
        return {
            notFound: true,
        };
    }
    const { name } = params;
    const crewNames = data.crew.map(({ name }: { name: string }) => name);
    const crew: ICrew | undefined = data.crew
        .find(({ name: _name }: { name: string }) => _name.toLowerCase().replace(' ', '-') === name);

    if (!crew) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            crewNames,
            crew,
        },
    };
};

export default CrewPage;
