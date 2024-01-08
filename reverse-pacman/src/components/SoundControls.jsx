import { useSound } from '../utils/SoundContext';
import { RxSpeakerLoud, RxSpeakerOff } from 'react-icons/rx';

function SoundControls() {
	const { isMuted, toggleMute } = useSound();

	return (
		<div
			style={{
				outline: 'none',
				position: 'absolute',
				top: 10,
				right: 20,
				cursor: 'pointer',
				fontSize: '30px',
				zIndex: 50,
			}}
			onClick={toggleMute}
		>
			{isMuted ? <RxSpeakerOff /> : <RxSpeakerLoud />}
		</div>
	);
}

export default SoundControls;
