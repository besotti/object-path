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
            subProfiles: [
                null,
                undefined,
                {
                    name: 'John',
                    address: {
                        street: 'Main St',
                        city: 'Somewhere',
                    },
                },
                {
                    name: 'Robb',
                    address: {
                        street: 'Second St',
                        city: 'Somewhere else',
                        postcode: '00000',
                        more: {
                            availableUntil: '2024-10-05T08:57:18.021Z',
                        },
                    },
                },
            ],
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

    test('should return a list of entries if the search is inside an array', () => {
        const cities = getPath(data, 'user.subProfiles.address.city');
        expect(cities).toEqual(['Somewhere', 'Somewhere else']);
    });

    test('should return only one element if the searched path exists only once within an array', () => {
        const postcode = getPath(data, 'user.subProfiles.address.postcode');
        expect(postcode).toEqual('00000');
    });

    test('should return default value if path does not exist in an array', () => {
        const nonExistentValue = getPath(data, 'user.subProfiles.address.zipcode.foo', 12);
        expect(nonExistentValue).toBe(12);
    });

    test('should not throw if the given object is empty', () => {
        const result = getPath({}, 'user.subProfiles', false);
        expect(result).toBeFalsy();
    });

    it('should return undefined when the initial object is null', () => {
        const result = getPath(null, 'user.profile.address.city', 'No City');
        expect(result).toBe('No City');
    });

    it('should return an empty array if all array items are undefined', () => {
        const testData = {
            user: {
                profile: [null, undefined],
            },
        };

        const result = getPath(testData, 'user.profile.address.city', 'No City');
        expect(result).toEqual('No City');
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

    test('should create an array if the path do not exist', () => {
        setPath(data, 'user.test', [{ foo: 'bar' }]);
        expect(data.user.test).toEqual([{ foo: 'bar' }]);
    });
});
