import { useEffect } from 'react';
import { AppInitialProps } from 'next/app';

// Components
import { Img, Button } from '@components/index';

// Languages
import { useTranslation } from '@languages/i18n';
import { Router } from 'next-i18next';

// Redux
import { connect, useSelector, useDispatch } from 'react-redux';
import { ReduxStates } from '@redux/reducers';
import { setLocale } from '@redux/actions';

/**
 * Home page
 * @author: Le Thang
 */
interface Props extends AppInitialProps {
    router: Router;
    pageLoading: boolean;
    locale: string;
}
interface INextHomePage<P = {}> extends React.FC<P> {
    getInitialProps: () => Promise<{ namespacesRequired: string[] }>;
}

const HomePage: INextHomePage<Props> = (props) => {
    const { t } = useTranslation(['home']);

    // useEffect as componentDidMount
    useEffect(() => {
        console.log(t('hello'));
    }, []);

    return (
        <div className="pages__home">
            <div className="pages__home-banner bases__container"></div>
            <div className="pages__home-section bases__container">
                <Button>Test</Button>
            </div>
        </div>
    );
};

HomePage.getInitialProps = async () => {
    return {
        namespacesRequired: ['title', 'home'],
    };
};

export default HomePage;
