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
 * About page
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
    const { t } = useTranslation(['about']);

    // useEffect as componentDidMount
    useEffect(() => {
        console.log(t('hello'));
    }, []);

    return (
        <div className="pages__about">
            <div>
                <header className="page-header">
                    <h1>{t('about:about')}</h1>
                </header>
                <div className="page">
                    <p>{t('about:introduce')}</p>
                    <p>{t('about:contact')} <a href="/">{t('about:articles')}</a> {t('about:or')} <a href="/">{t('about:contact_me')}</a>
                    </p>
                </div>
                <h3>Rua:</h3>
                <ul>
                    <li>
                        <Img src="/image-asset/school.png" className="icon">{t('about:characters.student')}
                    </li>
                    <li>
                        <Img src="/image-asset/man.png" className="icon">{t('about:characters.single_man')}
                    </li>
                    <li>
                        <Img src="/image-asset/ru-flag.png" className="icon">{t('about:characters.speak_russia')}
                    </li>
                    <li>
                        <Img src="/image-asset/computer.png" className="icon">{t('about:characters.developer')}
                    </li>
                    <li>
                        <Img src="/image-asset/camera.png" className="icon">{t('about:characters.photography')}
                    </li>
                    <li>
                        <Img src="/image-asset/ball.png" className="icon">{t('about:characters.sports')}
                    </li>
                </ul>
                <h2 id='year-in-review'>{t('about:year_in_review')}</h2>
                <ul>
                    <li>
                        <a href="/">2020 into 2021</a>
                    </li>
                </ul>
                <h2 id='List-to-do'>
                    {t('about:list_to_do')}
                </h2>
                <ul>
                    <li>2020</li>
                    <li>2021</li>
                </ul>
                <h2>{t('about:places')}</h2>
                <ul>
                    <li>Russia
                        <ul>
                            <li><a href="/">Crum</a></li>
                            <li><a href="/">Saint Peterburg</a></li>
                            <li><a href="/">Kazan</a></li>
                        </ul>
                    </li>
                    <li>Viet Nam
                        <ul>
                            <li><a href="/">Da Nang</a></li>
                            <li><a href="/">Nghe An</a></li>
                            <li><a href="/">Nha Trang</a></li>
                            <li><a href="/">Da Lat</a></li>
                        </ul>
                    </li>
                </ul>
                <h2 id="my-favorite-film">
                    {t('about:favorite_films')}
                </h2>
                <ul>
                    <li><a href="https://en.wikipedia.org/wiki/Your_Name">Your name</a></li>
                    <li><a href="https://en.wikipedia.org/wiki/A_Silent_Voice_(film)">Silent voice</a></li>
                    <li><a href="https://en.wikipedia.org/wiki/I_Want_to_Eat_Your_Pancreas">I want to eat your pancreas</a></li>
                    <li><a href="https://en.wikipedia.org/wiki/The_Garden_of_Words">The garden of word</a></li>
                </ul>
            </div>
        </div>
    );
};

HomePage.getInitialProps = async () => {
    return {
        namespacesRequired: ['about'],
    };
};

export default HomePage;
