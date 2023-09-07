import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import styles from './style.module.scss';
import { Paragraph, Title } from 'components/commons/Typography';
import Header from 'components/commons/Header';
import Container from 'components/commons/Container';
import Text from 'components/commons/Typography/Text';
import data from 'data/data.json';
import Tabs from 'components/commons/Tabs';

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
    return (
        <div className={styles.home}>
            <Header />
            <main className={styles.main}>
                <section className={styles.heroSection}>
                    <Container className={styles.container}>
                        <div className={styles.subtitle}>
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
                            <div className={styles.imageWrapper}>
                                <img className={styles.image}
                                     src={destination.images.webp}
                                     alt={''}
                                />
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
                                />

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
