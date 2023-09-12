import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import styles from './style.module.scss';
import { Paragraph, Title } from 'components/commons/Typography';
import Header from 'components/commons/Header';
import Container from 'components/commons/Container';
import Text from 'components/commons/Typography/Text';
import data from 'data/data.json';
import Tabs from 'components/commons/Tabs';
import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { createMatchMedia } from 'libs/breakpoints';

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

    useLayoutEffect(() => {
        const ctx = createMatchMedia((context) => {
            const { isMobile, isDesktop } = context.conditions as { isMobile: boolean, isDesktop: boolean };
            const timeline = gsap.timeline();

            timeline
                .delay(0.1)
                .fromTo('#overlay', {
                    opacity: 0.8,
                }, {
                    opacity: 0,
                })
                .fromTo('#subtitle', {
                    y: -30,
                    opacity: 0,
                }, {
                    y: 0,
                    opacity: 1,
                })
                .fromTo('#imageWrapper', {
                    x: !isMobile ? -1000 : -500,
                    scale: 0.3,
                    opacity: 0,
                }, {
                    x: 0,
                    scale: 1,
                    opacity: 1,
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
                    opacity: 0,
                }, {
                    x: 0,
                    y: 0,
                    opacity: 1,
                }, '-=2')
                .fromTo('#textContainer', {
                    x: isDesktop ? 30 : 0,
                    y: !isDesktop ? -30 : 0,
                    opacity: 0,
                }, {
                    x: 0,
                    y: 0,
                    opacity: 1,
                }, '-=2')
            ;
        }, [root]);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const ctx = createMatchMedia((context) => {
            const { isMobile, isDesktop } = context.conditions as { isMobile: boolean, isDesktop: boolean };

            tabTimeline.current = gsap.timeline({
                paused: true,
            })
                .fromTo('#imageWrapper', {
                    x: !isMobile ? -1000 : -500,
                    scale: 0.3,
                    opacity: 0,
                }, {
                    x: 0,
                    scale: 1,
                    opacity: 1,
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
                    opacity: 0,
                }, {
                    x: 0,
                    y: 0,
                    opacity: 1,
                }, '-=1.5')
            ;
        }, [root]);

        return () => {
            if (!tabTimeline.current) return;
            tabTimeline.current.kill();
            ctx.revert();
        }
    }, []);

    const onClickTabItem = () => {
        tabTimeline.current?.restart();
    };

    return (
        <div className={styles.home}
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
