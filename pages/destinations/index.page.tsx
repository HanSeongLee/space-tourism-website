import data from 'data/data.json';
import { GetStaticProps, NextPage } from 'next';

const DestinationsPage: NextPage = () => {
    return null;
}

export const getStaticProps: GetStaticProps = async () => {
    const destination = data.destinations[0];

    return {
        redirect: {
            permanent: false,
            destination: `/destinations/${destination.name.toLowerCase()}`,
        },
    };
};

export default DestinationsPage;
