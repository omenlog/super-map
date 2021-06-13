import { SuperMap } from "./";

describe("Super Map", () => {
    it("should create object that obey JS Map interface", () => {
        const map = SuperMap();
        expect(typeof map).toBe('object');
    });

    it("should allow set and get values", () => {
        const map = SuperMap<string, number>();
        map.set("value", 1);
        expect(map.get("value")).toBe(1);
    });

    it("should allow know at any time the size of the map based in its values", () => {
        const map = SuperMap<string, number>();
        map.set("value", 1);
        expect(map.size).toBe(1);

        map.set("new_value", 2);
        expect(map.size).toBe(2);
    });

    it("should allow empty an existing map", () => {
        const map = SuperMap<string, number>();
        map.set("value", 1);
        map.set("new_value", 2);

        map.clear();

        expect(map.size).toBe(0);
    });

    it("should allow pass a key value pairs iterable as arguments used in map initialization", () => {
        const map = SuperMap([["key", 1], ["another-key", 2]]);

        expect(map.size).toBe(2);
        expect(map.get("key")).toBe(1);
        expect(map.get("another-key")).toBe(2);
        expect(map.get("not-defined-key")).toBe(undefined);
    });

    it("should allow define a default value used as fallback during get operations", () => {
        const map = SuperMap<string, number>();
        const defaultValue = 10;

        const value = map.get("key", defaultValue);
        expect(value).toBe(defaultValue);

        expect(map.get("key")).toBe(defaultValue);
        expect(map.get("another-key")).toBeUndefined();
    });

    it("should not override defined values with default value for some specific key", () => {
        const map = SuperMap([["key", 1]]);
        expect(map.get('key', 2)).toBe(1);
    });

    it("should allow update existing values passing new ones", () => {
        const map = SuperMap([["key", 1]])
        map.update("key", 2);

        expect(map.get("key")).toBe(2);
    });

    it("should allow update  existing values passing down an update function allowing create new values from existing ones", () => {
        const map = SuperMap([["key", 1]])
        map.update("key", v => v! + 1);

        expect(map.get("key")).toBe(2);
    });

    it("should allow know if map has some specific key", () => {
        const map = SuperMap([["key", 1]]);
        expect(map.has("key")).toBe(true);
        expect(map.has("key-1")).toBe(false);
    });

    it("should allow delete some keys from the map", () => {
        const map = SuperMap([["name", "Alan"], ["lastName", "Turing"]])

        map.delete('name');

        expect(map.size).toBe(1);
        expect(map.has('name')).toBe(false);
    });

    it("it should return an entries iterator with every key-value pair", () => {
        const map = SuperMap([["name", "Alan"], ["lastName", "Turing"]]);
        let executionTimes = 0;

        for (const [key, value] of map.entries()) {
            expect(map.get(key)).toBe(value);
            executionTimes++;
        }

        expect(executionTimes).toBe(map.size);
    });

    it("allow run a callback function forEach map entry", () => {
        const map = SuperMap([["name", "Alan"], ["lastName", "Turing"]]);
        let executionTimes = 0;

        map.forEach((value, key) => {
            expect(map.get(key)).toBe(value);
            executionTimes++;
        });

        expect(executionTimes).toBe(map.size);
    });

    it("should allow get the keys as an iterator", () => {
        const map = SuperMap([["name", "Alan"], ["lastName", "Turing"]]);

        expect([...map.keys()]).toEqual(["name", "lastName"]);
    });

    it("should allow get the values as an iterator", () => {
        const map = SuperMap([["name", "Alan"], ["lastName", "Turing"]]);

        expect([...map.values()]).toEqual(["Alan", "Turing"]);
    });

    it("should allow filter map values based on some predicate", () => {
        const map = SuperMap([["key", 1], ["another-key", 2]]);

        const newMap = map.filter(value => value % 2 === 0);
        expect(newMap === map).toBe(false);
        expect(newMap.has("key")).toBe(false);
        expect(newMap.size).toBe(1);
        expect(newMap.get('another-key')).toBe(2);
    });

    it("should implement reducer protocol", () => {
        const map = SuperMap([["key", 1], ["another-key", 2]]);

        const sum = map.reduce((acc, value) => acc + value);
        expect(sum).toBe(3);

        const reducer = jest.fn().mockReturnValue(10);
        map.reduce(reducer, 1);

        expect(reducer).toHaveBeenCalledTimes(map.size);
        expect(reducer.mock.calls[0]).toEqual([1, 1, "key", map]);
        expect(reducer.mock.calls[1]).toEqual([10, 2, "another-key", map]);

        expect(SuperMap<string, number>().reduce((a, b) => a + b, 10)).toBe(10);
    });

    it("should allow map a function over the values stored in the SuperMap", () => {
        const superMap = SuperMap([["key", 1], ["another-key", 2]]);

        const double = (x: number) => x * 2;
        const newSuperMap = superMap.map(double);

        expect(newSuperMap === superMap).toBe(false);
        expect([...newSuperMap.entries()]).toEqual([["key", 2], ["another-key", 4]]);

        expect(SuperMap().map(() => 1).size).toBe(0);
    });


    it("should implement the reducer protocol asynchronously", async () => {
        const map = SuperMap([["key", 1], ["another-key", 2]]);

        const asyncAverage = await map.reduceAsync((acc, val) => {
            return new Promise((resolve) => setTimeout(() => resolve(acc + val), 0));
        });

        expect(asyncAverage).toBe(3);

        expect(await SuperMap<string, number>().reduceAsync((a, b) => Promise.resolve(a + b), 10)).toBe(10);
        expect(await SuperMap<string, number>().reduceAsync((a, b) => Promise.resolve(a + b))).toBe(undefined);
    });

    it("should make visible errors during async reduction", () => {
        function errorAsync() {
            const map = SuperMap([["key", 1], ["another-key", 2]]);

            return map.reduceAsync(() => Promise.reject("Error"));
        }

        expect(() => errorAsync()).rejects.toEqual("Error");
    });
});