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
            <div className="pages__home--lead">
                <div className="elevator">
                    <h1>{t('home:elevator.name')}</h1>
                    <p>{t('home:elevator.bio')}</p>
                    <div className="social-buttton">
                        <span>{t('home:elevator.github')}</span>
                    </div>
                </div>
                <div className="profile-section">
                    {/* <img src="../static/icon1.png" alt='rua-avatar' className="avatar"> */}
                    <div>
                        <h3>{t('home:elevator.title')}</h3>
                        <p>{t('home:elevator.quote')}</p>
                        <a href="/" className="button">{t('home:elevator.message')}</a>
                    </div>
		        </div>
            </div>
            {/* <div className="pages__home-frontPage">
                <section className="section">
                    <h2>
                        Latest Trips
                        <a href="/" className="view-all">View all</a>
                    </h2>
                    <section className="posts">
                        <a href="/">
                            <div className="each">
                                <Img className="image-wrapper" style="position: relative;overflow: hidden;display: inline-block;width: 30px;height: 30px" src='/image-asset/icon1.png' />
                                <div className="each-list-item">
                                    <h2>Ha Noi</h2>
                                </div>
                                <div className="alert">
                                    <div className="new">New!</div>
                                </div>
                            </div>
                        </a>
                    </section>
                </section>
            </div> */}
        </div>
    );
};

HomePage.getInitialProps = async () => {
    return {
        namespacesRequired: ['title', 'home'],
    };
};

export default HomePage;
