import { StyleSheet, Text, View, PanResponder, Alert, Modal, Button } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { baseUrl } from '../../shared/baseUrl';
import { useRef, useState } from 'react';
import { postComment } from '../comments/commentsSlice';
import { useDispatch } from 'react-redux';
import * as Animatable from 'react-native-animatable';

const RenderCampsite = (props) => {
    const { campsite } = props;

    const view = useRef();
    const dispatch = useDispatch();

    const isLeftSwipe = ({ dx }) => dx < -200;
    const isRightSwipe = ({ dx }) => dx > 200;

    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');

    const onShowModal = () => {
        setShowModal(!showModal);
    };

    const handleSubmit = () => {
        const newComment = {
            author,
            rating,
            text,
            campsiteId: campsite.id
        };
        dispatch(postComment(newComment));
        setShowModal(!showModal);
    };

    const resetForm = () => {
        setRating(0);
        setAuthor('');
        setText('');
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            view.current
                .rubberBand(1000)
                .then((endState) =>
                    console.log(endState.finished ? 'finished' : 'canceled')
                ); 
        },
        onPanResponderEnd: (e, gestureState) => {
            if (isLeftSwipe(gestureState)) {
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' +
                        campsite.name +
                        ' to favorites?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => console.log('Cancel Pressed')
                        },
                        {
                            text: 'OK',
                            onPress: () =>
                                props.isFavorite
                                    ? console.log('Already set as a favorite')
                                    : props.markFavorite()
                        }
                    ],
                    { cancelable: false }
                );
            } else if (isRightSwipe(gestureState)) {
                onShowModal(true);
            }
        }
    });

    if (campsite) {
        return (
            <Animatable.View
                animation='fadeInDownBig'
                duration={2000}
                delay={1000}
                ref={view}
                {...panResponder.panHandlers}
            >
                <Card containerStyle={styles.cardContainer}>
                    <Card.Image source={{ uri: baseUrl + campsite.image }}>
                        <View style={{ justifyContent: 'center', flex: 1 }}>
                            <Text style={styles.cardText}>{campsite.name}</Text>
                        </View>
                    </Card.Image>
                    <Text style={{ margin: 20 }}>{campsite.description}</Text>
                    <View style={styles.cardRow}>
                        <Icon
                            name={props.isFavorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            raised
                            reverse
                            onPress={() =>
                                props.isFavorite
                                    ? console.log('Already set as a favorite')
                                    : props.markFavorite()
                            }
                        />
                        <Icon
                            name='pencil'
                            type='font-awesome'
                            color='#5637DD'
                            raised
                            reverse
                            onPress={props.onShowModal}
                        />
                    </View>
                </Card>
                <Modal
                    animationType='slide'
                    transparent={false}
                    visible={showModal}
                    onRequestClose={() => setShowModal(!showModal)}
                >
                    <View style={styles.modal}>
                        <Rating
                            showRating
                            startingValue={rating}
                            imageSize={40}
                            onFinishRating={(rating) => setRating(rating)}
                            style={{ paddingVertical: 10 }}
                        />
                        <Input
                            placeholder='Author'
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            leftIconContainerStyle={{ paddingRight: 10 }}
                            onChangeText={(author) => setAuthor(author)}
                            value={author}
                        />
                        <Input
                            placeholder='Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                            leftIconContainerStyle={{ paddingRight: 10 }}
                            onChangeText={(text) => setText(text)}
                            value={text}
                        />
                        <View style={{margin: 10}}>
                            <Button
                                title='Submit'
                                color='#5637DD'
                                onPress={() => {
                                    handleSubmit()
                                    resetForm()
                                }}
                            />
                        </View>
                        <View style={{margin: 10}}>
                            <Button
                                onPress={() => setShowModal(!showModal)}
                                color='#808080'
                                title='Cancel'
                            />
                        </View>
                    </View>
                </Modal>
            </Animatable.View>
        );
    }
    return <View />;
};

const styles = StyleSheet.create({
    cardContainer: {
        padding: 0,
        margin: 0,
        marginBottom: 20
    },
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    cardText: {
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 20,
        textAlign: 'center',
        color: 'white',
        fontSize: 20
    }
});

export default RenderCampsite;