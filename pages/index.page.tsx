import type { NextPage } from 'next'
import styles from './style.module.scss';
import { Paragraph, Title } from 'components/commons/Typography';
import Header from 'components/commons/Header';
import Container from 'components/commons/Container';
import Button from 'components/commons/Button';
import Link from 'next/link';

const Home: NextPage = () => {
    return (
        <div className={styles.layout}>
            <Header />
            <main className={styles.main}>
                <section className={styles.heroSection}>
                    <Container className={styles.container}>
                        <div className={styles.content}>
                            <Title className={styles.subtitle}
                                   level={5}
                            >
                                So, you want to travel to
                            </Title>
                            <Title level={1}>
                                Space
                            </Title>
                            <Paragraph className={styles.description}>
                                Let’s face it; if you want to go to space, you might as well genuinely go to outer space
                                and
                                not hover kind of on the edge of it. Well sit back, and relax because we’ll give you a
                                truly
                                out of this world experience!
                            </Paragraph>
                        </div>

                        <div className={styles.buttonContainer}>
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
