import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import styles from './style.module.scss';
import { Paragraph, Title } from 'components/commons/Typography';
import Header from 'components/commons/Header';
import Container from 'components/commons/Container';
import Text from 'components/commons/Typography/Text';
import data from 'data/data.json';
import Tabs from 'components/commons/Tabs';

interface ITechnology {
    name: string;
    images: {
        portrait: string;
        landscape: string;
    };
    description: string;
}

const TechnologyPage = ({ technologyNames, technology }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
                                03
                            </Title>
                            <Title level={5}>
                                Space Launch 101
                            </Title>
                        </div>
                    </Container>
                    <div className={styles.content}>
                        <picture>
                            <source srcSet={technology.images.portrait}
                                    media={'(min-width: 1339px)'}
                            />

                            <img className={styles.image}
                                 src={technology.images.landscape}
                                 alt={''}
                            />
                        </picture>
                        <Container className={styles.container}>
                            <Tabs className={styles.tabs}
                                  type={'number'}
                                  items={technologyNames.map((name) => {
                                      return {
                                          label: name,
                                          href: `/technologies/${name.toLowerCase().replace(' ', '-')}`,
                                      };
                                  })}
                                  activeTabIndex={technologyNames.indexOf(technology.name)}
                            />

                            <div className={styles.textContainer}>
                                <Text type={'nav'}>
                                    The Terminology…
                                </Text>
                                <Title level={3}>
                                    {technology.name}
                                </Title>

                                <Paragraph className={styles.description}>
                                    {technology.description}
                                </Paragraph>
                            </div>
                        </Container>
                    </div>
                </section>
            </main>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = data.technology.map(({ name }: { name: string }) => ({
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
    technologyNames: string[];
    technology: ITechnology;
}> = async ({ params }) => {
    if (!params?.name) {
        return {
            notFound: true,
        };
    }
    const { name } = params;
    const technologyNames = data.technology.map(({ name }: { name: string }) => name);
    const technology: ITechnology | undefined = data.technology
        .find(({ name: _name }: { name: string }) => _name.toLowerCase().replace(' ', '-') === name);

    if (!technology) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            technologyNames,
            technology,
        },
    };
};

export default TechnologyPage;
