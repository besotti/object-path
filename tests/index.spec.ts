import { getPath, setPath } from '../src';

describe('getPath', () => {
    const data = {
        user: {
            profile: {
                name: 'John',
                address: {
                    street: 'Main St',
                    city: 'Somewhere',
                },
            },
        },
    };

    test('should get the correct nested value', () => {
        const street = getPath(data, 'user.profile.address.street');
        expect(street).toBe('Main St');
    });

    test('should return default value if path does not exist', () => {
        const zipCode = getPath(data, 'user.profile.address.zipCode', '00000');
        expect(zipCode).toBe('00000');
    });

    test('should return undefined if path does not exist and no default value is provided', () => {
        const country = getPath(data, 'user.profile.address.country');
        expect(country).toBeUndefined();
    });
});

describe('setPath', () => {
    let data: any;

    beforeEach(() => {
        data = {
            user: {
                profile: {
                    name: 'John',
                },
            },
        };
    });

    test('should set the correct nested value', () => {
        setPath(data, 'user.profile.age', 30);
        expect(data.user.profile.age).toBe(30);
    });

    test('should create intermediate objects if they do not exist', () => {
        setPath(data, 'user.profile.address.street', 'Second St');
        expect(data.user.profile.address.street).toBe('Second St');
    });
});
