import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

import { useState, useEffect } from 'react';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	/* состояние страницы */
	const [articleState, setArticleState] = useState(defaultArticleState);


	const getCurrentStyles = () => {
		return {
		  '--font-family': articleState.fontFamilyOption.value,
		  '--font-size': articleState.fontSizeOption.value,
		  '--font-color': articleState.fontColor.value,
		  '--container-width': articleState.contentWidth.value,
		  '--bg-color': articleState.backgroundColor.value,
		} as CSSProperties;
	};
	

	return (
		<div
			className={clsx(styles.main)}
			style={getCurrentStyles()}>
			<ArticleParamsForm 	articleState={articleState} isOpen={isOpen} setIsOpen={setIsOpen} onChange={
					(changedArticleState: ArticleStateType) => {
						console.log("articleState is changed")
						setArticleState(changedArticleState);
					}
				} onReset={(e: React.FormEvent<HTMLButtonElement>) => {
					
					setArticleState(defaultArticleState)}}/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
