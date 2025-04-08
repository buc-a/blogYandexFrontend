import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { Text } from '../text';
import { Spacing } from '../spacing';
import { Select } from '../select'
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	ArticleStateType,
	defaultArticleState
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	articleState: ArticleStateType;
	onChange: (changedArticleState: ArticleStateType) => void;
}

export const ArticleParamsForm = ({articleState, onChange}: ArticleParamsFormProps) => {

	const [isOpen, setIsOpen] = useState<boolean>(false);

	/* будет выполняться при каждом изменении формата статьи */
	useEffect(() =>
	{
		console.log("articleState is changed")
		setIsOpen(false)
	}, [articleState])

	const toggleOpen = () => {
		console.log("openState is changed");
		setIsOpen(isOpen ? false : true);
	};

	/* описываем состояние каждого элемента */
	const [fontFamilyState, setFamilyValue] = useState<OptionType>(articleState.fontFamilyOption);
	const [fontSizeState, setFontSizeValue] = useState<OptionType>(articleState.fontSizeOption);
	const [fontColorState, setFontColorValue] = useState<OptionType>(articleState.fontColor);
	const [backgroundColorState, setBackgroundColorValue] = useState<OptionType>(articleState.backgroundColor);
	const [contentWidthState, setContentWidthValue] = useState<OptionType>(articleState.contentWidth);

	return (
		<>
			<ArrowButton state={isOpen} onClick={toggleOpen}/>
			<aside
				/* показываем боковое меню в зависимости от состояния */
				className={clsx(styles.container, isOpen ? styles.container_open : null)}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
					<Text
						size={31}
						weight={800}
						uppercase={true}
						family='open-sans'
					>
						Задайте параметры
					</Text>
					<Spacing size={50}/>
					<Select
						selected={fontFamilyState}
						options={fontFamilyOptions}
						onChange={setFamilyValue}
						title='ШРИФТ'
					/>
					<Spacing size={50}/>
					<RadioGroup
						name='font-sizes'
						selected={fontSizeState}
						options={fontSizeOptions}
						onChange={setFontSizeValue}
						title='РАЗМЕР ШРИФТА'
					/>
					<Spacing size={50}/>
					<Select
						selected={fontColorState}
						options={fontColors}
						onChange={setFontColorValue}
						title='ЦВЕТ ШРИФТА'
					/>
					<Spacing size={50}/>
					<Separator/>
					<Spacing size={50}/>
					<Select
						selected={backgroundColorState}
						options={backgroundColors}
						onChange={setBackgroundColorValue}
						title='ЦВЕТ ФОНА'
					/>
					<Spacing size={50}/>
					<Select
						selected={contentWidthState}
						options={contentWidthArr}
						onChange={setContentWidthValue}
						title='ШИРИНА КОНТЕНТА'
					/>
					<Spacing size={72}/>
						<Button
							title='Сбросить'
							type='reset'
						/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
