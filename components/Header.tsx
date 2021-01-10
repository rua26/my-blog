import { Fragment, useEffect, useState } from 'react';

import Head from 'next/head';

// Languages
import { i18n, useTranslation } from '@languages/i18n';
import { Router } from 'next-i18next';

// Components
import Dropdown from './client/Dropdown';
import Button from './client/Button';
import Img from './client/Img';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '@redux/actions';
import { ReduxStates } from '@redux/reducers';
import { logicalExpression } from '@babel/types';

/**
 * Header
 * @author: Le Thang
 */
interface Props {
    pageLoading: boolean;
    router: Router;
}
interface IComponentHeader<P = {}> extends React.FC<P> {
    getInitialProps: () => Promise<{ namespacesRequired: string[] }>;
}

const Header: IComponentHeader<Props> = (props) => {
    // Constructor
    const locale = useSelector((states: ReduxStates) => states.locale);
    const { t } = useTranslation(['header']);
    const dispatch = useDispatch();
    const [state, setState] = useState(() => {
        return {
            languages: [
                {
                    code: 'en',
                    title: 'English',
                    is_default: 1,
                },
                {
                    code: 'vi',
                    title: 'Tiếng Việt',
                    is_default: 0,
                },
            ],
        };
    });

    // useEffect as componentDidMount
    useEffect(() => {
        setLanguage(i18n.language);
    }, []);

    const setLanguage = (locale: string) => {
        i18n.changeLanguage(locale);
        dispatch(actions.setLocale(locale));
    };

    return (
        <Fragment>
            <Head>
                <title>Tony Le</title>
                <link href="/library-asset/css/toastr.min.css" rel="stylesheet" />
                <link href="/library-asset/css/tachyons.min.css" rel="stylesheet" />
                <link href="/client-asset/css/main.css" rel="stylesheet" />
                <link rel="icon" type="image/ico" href="/favicon.ico" />
            </Head>
            {!props.pageLoading ? (
                <div className="components__header white">
                    <div className="flex justify-between items-center">
                        <div>
                            <Img src="/image-asset/logo.svg" />
                        </div>
                        <div className="bases__text--bold bases__p--cursor flex items-center">
                            {/* <Dropdown id={'menu_1_dropdown'} items={state.menu_1} itemIndex={'title'} onClickItem={(item: any) => {}}>
                                <div className="mr4 ml2 drop-trigger">Menu 1</div>
                            </Dropdown> */}
                            <div className="mr4 ml5">{t('header:navBar.articles')}</div>
                            <div className="mr4 ml5">{t('header:navBar.guides')}</div>
                            <div className="mr5 ml5">{t('header:navBar.about')}</div>
                        </div>
                    </div>
                    <div className="bases__font--22 ph3-l">
                        <Dropdown
                            id={'multilang-dropdown'}
                            items={state.languages}
                            itemIndex={'title'}
                            onClickItem={(item: any) => setLanguage(item.code)}>
                            {locale}
                        </Dropdown>
                    </div>
                </div>
            ) : (
                ''
            )}
        </Fragment>
    );
};

Header.getInitialProps = async () => {
    return {
        namespacesRequired: ['header'],
    };
};

export default Header;
