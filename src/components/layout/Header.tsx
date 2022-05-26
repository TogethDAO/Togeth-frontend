import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useTranslation } from 'react-i18next';
import Connect from '../wallet/Connect';

const Header = () => {
	const { t } = useTranslation('');
	const { pathname, route, replace, locale, asPath } = useRouter();

	const routes = [
		{
			path: '/account',
			label: 'MY PARTICIPATE',
		},
		{
			path: '/proposal',
			label: 'PROPOSALS',
		},
		{
			path: '/create',
			label: 'CREATE',
		},
	];

	return (
		<div className="px-10 sticky text-[#0D2C4D] z-10">
			<header className="flex items-center ">
				<NextLink href={'/'} passHref>
					<a>
						<Image src="/static/img/logo.png" alt="" width={'112px'} height={'112px'}></Image>
					</a>
				</NextLink>
				<div className="ml-auto flex items-center">
					<nav className="text-xl">
						<ul className="flex space-x-8">
							{routes.map(({ label, path }) => {
								return (
									<li
										key={label}
										className={classNames('px-4', {
											'text-underline-primary font-medium': !!pathname.match(
												new RegExp(`^${path}`),
											),
										})}
									>
										<NextLink href={path} passHref>
											<a className="hover:text-current">{label}</a>
										</NextLink>
									</li>
								);
							})}
						</ul>
					</nav>
					<Connect></Connect>
				</div>
			</header>
		</div>
	);
};

export default Header;
