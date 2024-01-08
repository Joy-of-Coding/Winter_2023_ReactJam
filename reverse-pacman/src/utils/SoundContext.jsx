import React, { createContext, useContext, useState, useEffect } from 'react';
import backgroundMusic from '../assets/backgroundMusic.mp3';
import munchSound from '../assets/pacman_chomp.wav';
import deathSound from '../assets/pacman_death.wav';

const SoundContext = createContext();

export const useSound = () => useContext(SoundContext);

export const SoundProvider = ({ children }) => {
	const [isMuted, setIsMuted] = useState(true);
	const [backgroundAudio] = useState(new Audio(backgroundMusic));
	const [munchAudio] = useState(new Audio(munchSound));
	const [deathAudio] = useState(new Audio(deathSound));

	const toggleMute = () => {
		setIsMuted(!isMuted);
	};

	useEffect(() => {
		isMuted ? backgroundAudio.pause() : backgroundAudio.play();
	}, [isMuted, backgroundAudio]);

	const playMunchSound = () => {
		if (!isMuted) munchAudio.play();
	};

	const playDeathSound = () => {
		if (!isMuted) deathAudio.play();
	};

	const value = {
		isMuted,
		toggleMute,
		playMunchSound,
		playDeathSound,
	};

	return (
		<SoundContext.Provider value={value}>{children}</SoundContext.Provider>
	);
};

export default SoundContext;
