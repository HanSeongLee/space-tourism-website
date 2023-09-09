import data from 'data/data.json';
import { GetStaticProps, NextPage } from 'next';

const TechnologiesPage: NextPage = () => {
    return null;
}

export const getStaticProps: GetStaticProps = async () => {
    const technology = data.technology[0];

    return {
        redirect: {
            permanent: false,
            destination: `/technologies/${technology.name.toLowerCase().replace(' ', '-')}`,
        },
    };
};

export default TechnologiesPage;
