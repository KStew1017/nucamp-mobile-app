import { ScrollView } from 'react-native';
import { Card, Text, Avatar, ListItem } from 'react-native-elements';
import { PARTNERS } from '../shared/partners';
import { useState } from 'react';

const Mission = () => {
    return (
        <Card wrapperStyle={{ margin: 10 }}>
            <Card.Title>Our Mission</Card.Title>
            <Card.Divider />
            <Text>
                We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness.
                We increase access to adventure for the public while promoting safe and respectful use of resources.
                The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other.
            </Text>
        </Card>
    );
};

const AboutScreen = () => {
    const [partners, setPartners] = useState(PARTNERS);

    return (
        <ScrollView>
            <Mission />
            <Card title={'Community Partners'}>
                <Card.Title>Community Partners</Card.Title>
                <Card.Divider />
                {partners.map((partner) => (
                        <ListItem key={partner.id}>
                            <Avatar rounded source={partner.image} />
                            <ListItem.Content>
                                <ListItem.Title>{partner.name}</ListItem.Title>
                                <ListItem.Subtitle>{partner.description}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                )}
            </Card>
        </ScrollView>
    );
};


export default AboutScreen;