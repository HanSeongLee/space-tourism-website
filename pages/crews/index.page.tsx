import data from 'data/data.json';
import { GetStaticProps, NextPage } from 'next';

const CrewsPage: NextPage = () => {
    return null;
}

export const getStaticProps: GetStaticProps = async () => {
    const crew = data.crew[0];

    return {
        redirect: {
            permanent: false,
            destination: `/crews/${crew.name.toLowerCase().replace(' ', '-')}`,
        },
    };
};

export default CrewsPage;
