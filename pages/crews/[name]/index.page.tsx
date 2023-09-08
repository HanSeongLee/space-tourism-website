import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import styles from './style.module.scss';
import { Paragraph, Title } from 'components/commons/Typography';
import Header from 'components/commons/Header';
import Container from 'components/commons/Container';
import data from 'data/data.json';
import Tabs from 'components/commons/Tabs';

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
    return (
        <div className={styles.layout}>
            <Header />
            <main className={styles.main}>
                <section className={styles.heroSection}>
                    <Container className={styles.container}>
                        <div className={styles.subtitle}>
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
                            <div className={styles.imageWrapper}>
                                <img className={styles.image}
                                     src={crew.images.webp}
                                     alt={''}
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
                            />

                            <div className={styles.textContainer}>
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
