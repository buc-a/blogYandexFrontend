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
	/* состояние страницы */
	const [articleState, setArticleState] = useState(defaultArticleState);

	/* состояния страницы */
	const [fontFamilyValue, setFontFamilyValue] = useState(defaultArticleState.fontFamilyOption.value);
	const [fontColorValue, setFontColorValue] = useState(defaultArticleState.fontColor.value);
	const [backgroundColorValue, setBackgroundColorValue] = useState(defaultArticleState.backgroundColor.value);
	const [contentWidthValue, setContentWidthValue] = useState(defaultArticleState.contentWidth.value);
	const [fontSizeValue, setFontSizeValue] = useState(defaultArticleState.fontSizeOption.value);


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
			<ArticleParamsForm 	articleState={articleState} onChange={
					(changedArticleState: ArticleStateType) => {
						console.log("articleState is changed")
						setArticleState(changedArticleState);
					}
				} onReset={(e: React.FormEvent<HTMLButtonElement>) => {
					e.preventDefault()
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
