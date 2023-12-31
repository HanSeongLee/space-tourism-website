import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import styles from './style.module.scss';
import { Paragraph, Title } from 'components/commons/Typography';
import Header from 'components/commons/Header';
import Container from 'components/commons/Container';
import Text from 'components/commons/Typography/Text';
import data from 'data/data.json';
import Tabs from 'components/commons/Tabs';
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { createMatchMedia } from 'libs/breakpoints';
import cn from 'classnames';

interface IDestination {
    name: string;
    images: {
        webp: string;
        png: string;
    };
    description: string;
    distance: string;
    travel: string;
}

const DestinationPage = ({ destinationNames, destination }: InferGetStaticPropsType<typeof getStaticProps>) => {
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

            gsap.set(['#subtitle', '#imageWrapper', '#tabs', '#textContainer'], {
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
                .fromTo('#imageWrapper', {
                    x: !isMobile ? -1000 : -500,
                    scale: 0.3,
                }, {
                    x: 0,
                    scale: 1,
                    autoAlpha: 1,
                    duration: 2,
                })
                .fromTo('#shadow', {
                    x: -1200,
                    y: -1200,
                }, {
                    x: 74,
                    y: 36,
                    duration: 2,
                }, '-=2')
                .fromTo('#tabs', {
                    x: isDesktop ? 30 : 0,
                    y: !isDesktop ? -30 : 0,
                }, {
                    x: 0,
                    y: 0,
                    autoAlpha: 1,
                }, '-=2')
                .fromTo('#textContainer', {
                    x: isDesktop ? 30 : 0,
                    y: !isDesktop ? -30 : 0,
                }, {
                    x: 0,
                    y: 0,
                    autoAlpha: 1,
                }, '-=2')
            ;

            tabTimeline.current = gsap.timeline({
                paused: true,
            })
                .fromTo('#imageWrapper', {
                    x: !isMobile ? -1000 : -500,
                    scale: 0.3,
                }, {
                    x: 0,
                    scale: 1,
                    autoAlpha: 1,
                    duration: 2,
                })
                .fromTo('#shadow', {
                    x: -1200,
                    y: -1200,
                }, {
                    x: 74,
                    y: 36,
                    duration: 2,
                }, '-=2')
                .fromTo('#textContainer', {
                    x: isDesktop ? 30 : 0,
                    y: !isDesktop ? -30 : 0,
                }, {
                    x: 0,
                    y: 0,
                    autoAlpha: 1,
                }, '-=1.5')
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
            return ;
        }

        tabTimeline.current?.restart();
    }, [initialLoad, imageLoaded]);

    const onClickTabItem = () => {
        gsap.set(['#imageWrapper', '#textContainer'], {
            autoAlpha: 0,
        });
        tabTimeline.current?.restart();
    };

    const onImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <div className={cn(styles.home, {
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
                                01
                            </Title>
                            <Title level={5}>
                                Pick your destination
                            </Title>
                        </div>
                        <div className={styles.content}>
                            <div className={styles.imageWrapper}
                                 id={'imageWrapper'}
                            >
                                <img className={styles.image}
                                     src={destination.images.webp}
                                     alt={''}
                                     onLoad={onImageLoad}
                                />
                                <div className={styles.shadow}
                                     id={'shadow'}
                                ></div>
                            </div>

                            <div className={styles.rightSide}>
                                <Tabs className={styles.tabs}
                                      items={destinationNames.map((name) => {
                                          return {
                                              label: name,
                                              href: `/destinations/${name.toLowerCase()}`,
                                          };
                                      })}
                                      activeTabIndex={destinationNames.indexOf(destination.name)}
                                      onClickItem={onClickTabItem}
                                      id={'tabs'}
                                />

                                <div className={styles.textContainer}
                                     id={'textContainer'}
                                >
                                    <Title level={2}>
                                        {destination.name}
                                    </Title>
                                    <Paragraph>
                                        {destination.description}
                                    </Paragraph>

                                    <hr />

                                    <div className={styles.subtitleContainer}>
                                        <div className={styles.subtitleWrapper}>
                                            <Text type={'subtitle2'}>
                                                Avg. Distance
                                            </Text>
                                            <Text type={'subtitle1'}>
                                                {destination.distance}
                                            </Text>
                                        </div>

                                        <div className={styles.subtitleWrapper}>
                                            <Text type={'subtitle2'}>
                                                Est. Travel Time
                                            </Text>
                                            <Text type={'subtitle1'}>
                                                {destination.travel}
                                            </Text>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>
            </main>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = data.destinations.map(({ name }: { name: string }) => ({
        params: {
            name: name.toLowerCase(),
        },
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<{
    destinationNames: string[];
    destination: IDestination;
}> = async ({ params }) => {
    if (!params?.name) {
        return {
            notFound: true,
        };
    }
    const { name } = params;
    const destinationNames = data.destinations.map(({ name }: { name: string }) => name);
    const destination: IDestination | undefined = data.destinations
        .find(({ name: _name }: { name: string }) => _name.toLowerCase() === name);

    if (!destination) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            destinationNames,
            destination,
        },
    };
};

export default DestinationPage;
