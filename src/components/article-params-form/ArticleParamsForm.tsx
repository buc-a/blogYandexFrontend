import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useRef, useEffect } from 'react';
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
	isOpen: boolean;
	setIsOpen: (arg: boolean) => void;
	onChange: (changedArticleState: ArticleStateType) => void;
	onReset: (e: React.FormEvent<HTMLButtonElement>)  => void;
}

export const ArticleParamsForm = ({articleState, onChange, onReset, isOpen, setIsOpen}: ArticleParamsFormProps) => {

	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
			isOpen &&
			formRef.current &&
			!formRef.current.contains(event.target as Node)
			) {
			toggleOpen();
			}
		  };
		  document.addEventListener('mousedown', handleClickOutside);
		  return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen])

	useEffect(() => {
		console.log("изменения в состоянии")
		setFamilyValue(articleState.fontFamilyOption);
		setFontSizeValue(articleState.fontSizeOption);
		setFontColorValue(articleState.fontColor);
		setBackgroundColorValue(articleState.backgroundColor);
		setContentWidthValue(articleState.contentWidth);
	}, [articleState])

	const toggleOpen = () => {
		console.log("openState is changed");
		setIsOpen(isOpen ? false : true);
	};

	/* при применении изменений к статье */
	const applyChanges = (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault(); 
		onChange({
			fontFamilyOption: fontFamilyState,
			fontColor: fontColorState,
			backgroundColor: backgroundColorState,
			contentWidth: contentWidthState,
			fontSizeOption: fontSizeState
		})
		setIsOpen(false)
		console.log("нажали применить")
	}

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
				ref = {formRef}
				className={clsx(styles.container, isOpen ? styles.container_open : null)} onClick={(e) => e.stopPropagation()}>
				<form className={styles.form}>
					
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
						/* что выбрано? из чего выбирать? что делаь при изменении? */
						selected={fontFamilyState}
						options={fontFamilyOptions}
						onChange={setFamilyValue}
						title='Стиль шрифта'
					/>
					<Spacing size={50}/>
					<RadioGroup
						name='font-sizes'
						selected={fontSizeState}
						options={fontSizeOptions}
						onChange={setFontSizeValue}
						title='Размер шрифта'
					/>
					<Spacing size={50}/>
					<Select
						selected={fontColorState}
						options={fontColors}
						onChange={setFontColorValue}
						title='Цвет шрифта'
					/>
					<Spacing size={50}/>
					<Separator/>
					<Spacing size={50}/>
					<Select
						selected={backgroundColorState}
						options={backgroundColors}
						onChange={setBackgroundColorValue}
						title='Цвет фона'
					/>
					<Spacing size={50}/>
					<Select
						selected={contentWidthState}
						options={contentWidthArr}
						onChange={setContentWidthValue}
						title='Ширина'
					/>
					<Spacing size={72}/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={onReset}
						/>
						<Button title='Применить' type='submit' onClick={(e) => applyChanges(e as React.FormEvent<HTMLButtonElement>)}/>
					</div>
				</form>
			</aside>
		</>
	);
};
