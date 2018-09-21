type Long = protobuf.Long;
// DO NOT EDIT! This is a generated file. Edit the JSDoc in src/*.js instead and run 'npm run types'.

/** Namespace msg. */
declare namespace msg {

    /** Properties of an AccountInfo. */
    interface IAccountInfo {

        /** AccountInfo account */
        account?: (string|null);

        /** AccountInfo passwd */
        passwd?: (string|null);

        /** AccountInfo userid */
        userid?: (number|Long|null);
    }

    /** Represents an AccountInfo. */
    class AccountInfo implements IAccountInfo {

        /**
         * Constructs a new AccountInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IAccountInfo);

        /** AccountInfo account. */
        public account: string;

        /** AccountInfo passwd. */
        public passwd: string;

        /** AccountInfo userid. */
        public userid: (number|Long);

        /**
         * Creates a new AccountInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AccountInfo instance
         */
        public static create(properties?: msg.IAccountInfo): msg.AccountInfo;

        /**
         * Encodes the specified AccountInfo message. Does not implicitly {@link msg.AccountInfo.verify|verify} messages.
         * @param message AccountInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IAccountInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified AccountInfo message, length delimited. Does not implicitly {@link msg.AccountInfo.verify|verify} messages.
         * @param message AccountInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IAccountInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an AccountInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AccountInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.AccountInfo;

        /**
         * Decodes an AccountInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AccountInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.AccountInfo;

        /**
         * Verifies an AccountInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AccountInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AccountInfo
         */
        public static fromObject(object: { [k: string]: any }): msg.AccountInfo;

        /**
         * Creates a plain object from an AccountInfo message. Also converts values to other types if specified.
         * @param message AccountInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.AccountInfo, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AccountInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AccountGateInfo. */
    interface IAccountGateInfo {

        /** AccountGateInfo ip */
        ip?: (string|null);

        /** AccountGateInfo port */
        port?: (number|null);

        /** AccountGateInfo verifykey */
        verifykey?: (string|null);
    }

    /** Represents an AccountGateInfo. */
    class AccountGateInfo implements IAccountGateInfo {

        /**
         * Constructs a new AccountGateInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IAccountGateInfo);

        /** AccountGateInfo ip. */
        public ip: string;

        /** AccountGateInfo port. */
        public port: number;

        /** AccountGateInfo verifykey. */
        public verifykey: string;

        /**
         * Creates a new AccountGateInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AccountGateInfo instance
         */
        public static create(properties?: msg.IAccountGateInfo): msg.AccountGateInfo;

        /**
         * Encodes the specified AccountGateInfo message. Does not implicitly {@link msg.AccountGateInfo.verify|verify} messages.
         * @param message AccountGateInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IAccountGateInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified AccountGateInfo message, length delimited. Does not implicitly {@link msg.AccountGateInfo.verify|verify} messages.
         * @param message AccountGateInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IAccountGateInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an AccountGateInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AccountGateInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.AccountGateInfo;

        /**
         * Decodes an AccountGateInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AccountGateInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.AccountGateInfo;

        /**
         * Verifies an AccountGateInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AccountGateInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AccountGateInfo
         */
        public static fromObject(object: { [k: string]: any }): msg.AccountGateInfo;

        /**
         * Creates a plain object from an AccountGateInfo message. Also converts values to other types if specified.
         * @param message AccountGateInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.AccountGateInfo, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AccountGateInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IpHost. */
    interface IIpHost {

        /** IpHost ip */
        ip?: (string|null);

        /** IpHost port */
        port?: (number|null);
    }

    /** Represents an IpHost. */
    class IpHost implements IIpHost {

        /**
         * Constructs a new IpHost.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IIpHost);

        /** IpHost ip. */
        public ip: string;

        /** IpHost port. */
        public port: number;

        /**
         * Creates a new IpHost instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IpHost instance
         */
        public static create(properties?: msg.IIpHost): msg.IpHost;

        /**
         * Encodes the specified IpHost message. Does not implicitly {@link msg.IpHost.verify|verify} messages.
         * @param message IpHost message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IIpHost, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified IpHost message, length delimited. Does not implicitly {@link msg.IpHost.verify|verify} messages.
         * @param message IpHost message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IIpHost, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an IpHost message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IpHost
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.IpHost;

        /**
         * Decodes an IpHost message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IpHost
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.IpHost;

        /**
         * Verifies an IpHost message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IpHost message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IpHost
         */
        public static fromObject(object: { [k: string]: any }): msg.IpHost;

        /**
         * Creates a plain object from an IpHost message. Also converts values to other types if specified.
         * @param message IpHost
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.IpHost, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IpHost to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** ItemId enum. */
    enum ItemId {
        YuanBao = 60001,
        Diamond = 60002,
        Gold = 60003,
        FreeStep = 60005,
        Strength = 60006,
        RedDiamond = 100001,
        RedDiamondParts = 100002
    }

    /** ItemType enum. */
    enum ItemType {
        Normal = 0,
        Digital = 1,
        ShoppingCard = 2,
        DailyUse = 3,
        Toy = 4,
        MobileCard = 5,
        Currency = 6,
        CarAccessory = 7,
        Advertisement = 8,
        Smallware = 9,
        DiamondItem = 10,
        ClothesParts = 11,
        HouseParts = 12,
        CarParts = 13,
        MaidParts = 14,
        ClothesItem = 15
    }

    /** Properties of a PairNumItem. */
    interface IPairNumItem {

        /** PairNumItem itemid */
        itemid?: (number|null);

        /** PairNumItem num */
        num?: (number|null);
    }

    /** Represents a PairNumItem. */
    class PairNumItem implements IPairNumItem {

        /**
         * Constructs a new PairNumItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IPairNumItem);

        /** PairNumItem itemid. */
        public itemid: number;

        /** PairNumItem num. */
        public num: number;

        /**
         * Creates a new PairNumItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PairNumItem instance
         */
        public static create(properties?: msg.IPairNumItem): msg.PairNumItem;

        /**
         * Encodes the specified PairNumItem message. Does not implicitly {@link msg.PairNumItem.verify|verify} messages.
         * @param message PairNumItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IPairNumItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified PairNumItem message, length delimited. Does not implicitly {@link msg.PairNumItem.verify|verify} messages.
         * @param message PairNumItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IPairNumItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a PairNumItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PairNumItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.PairNumItem;

        /**
         * Decodes a PairNumItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PairNumItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.PairNumItem;

        /**
         * Verifies a PairNumItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PairNumItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PairNumItem
         */
        public static fromObject(object: { [k: string]: any }): msg.PairNumItem;

        /**
         * Creates a plain object from a PairNumItem message. Also converts values to other types if specified.
         * @param message PairNumItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.PairNumItem, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PairNumItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** TaskId enum. */
    enum TaskId {
        RegistAccount = 1001,
        RegisterTopScore = 1002,
        InviteeTopScore = 1003,
        InviteRegist = 1004
    }

    /** ItemPos enum. */
    enum ItemPos {
        Bag = 0,
        Helmet = 1,
        Clothes = 2,
        Pants = 3,
        Shoe = 4,
        Hand = 5,
        Wing = 6,
        Suit = 7,
        LongClothes = 8
    }

    /** MapEventType enum. */
    enum MapEventType {
        Game = 1,
        Bonus = 2,
        Building = 3
    }

    /** MapEventId enum. */
    enum MapEventId {
        GameTanTanLe = 1001,
        GameSuperMarket = 1002,
        GameFanFanLe = 1003,
        BonusGold = 2001,
        BonusStrength = 2002,
        BuildingMaidShop = 3001,
        BuildingCarShop = 3002,
        BuildingHouseShop = 3003
    }

    /** Sex enum. */
    enum Sex {
        Unknow = 0,
        Male = 1,
        Female = 2,
        Neutral = 3
    }

    /** MoneyType enum. */
    enum MoneyType {
        _Gold = 1,
        _Diamond = 2,
        _Strength = 3,
        _Item = 4
    }

    /** UserInfoType enum. */
    enum UserInfoType {
        Name = 1,
        UserSex = 2,
        Age = 3,
        Sign = 4,
        Constellation = 5,
        Face = 6,
        Baseprovince = 7,
        Basecity = 8,
        Level = 9,
        Exp = 10,
        NewPlayerStep = 11
    }

    /** RoomKind enum. */
    enum RoomKind {
        TanTanLe = 1,
        TexasPoker = 2
    }

    /** Properties of a C2GW_AddDeliveryAddress. */
    interface IC2GW_AddDeliveryAddress {

        /** C2GW_AddDeliveryAddress info */
        info?: (msg.IUserAddress|null);
    }

    /** Represents a C2GW_AddDeliveryAddress. */
    class C2GW_AddDeliveryAddress implements IC2GW_AddDeliveryAddress {

        /**
         * Constructs a new C2GW_AddDeliveryAddress.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_AddDeliveryAddress);

        /** C2GW_AddDeliveryAddress info. */
        public info?: (msg.IUserAddress|null);

        /**
         * Creates a new C2GW_AddDeliveryAddress instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_AddDeliveryAddress instance
         */
        public static create(properties?: msg.IC2GW_AddDeliveryAddress): msg.C2GW_AddDeliveryAddress;

        /**
         * Encodes the specified C2GW_AddDeliveryAddress message. Does not implicitly {@link msg.C2GW_AddDeliveryAddress.verify|verify} messages.
         * @param message C2GW_AddDeliveryAddress message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_AddDeliveryAddress, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_AddDeliveryAddress message, length delimited. Does not implicitly {@link msg.C2GW_AddDeliveryAddress.verify|verify} messages.
         * @param message C2GW_AddDeliveryAddress message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_AddDeliveryAddress, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_AddDeliveryAddress message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_AddDeliveryAddress
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_AddDeliveryAddress;

        /**
         * Decodes a C2GW_AddDeliveryAddress message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_AddDeliveryAddress
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_AddDeliveryAddress;

        /**
         * Verifies a C2GW_AddDeliveryAddress message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_AddDeliveryAddress message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_AddDeliveryAddress
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_AddDeliveryAddress;

        /**
         * Creates a plain object from a C2GW_AddDeliveryAddress message. Also converts values to other types if specified.
         * @param message C2GW_AddDeliveryAddress
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_AddDeliveryAddress, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_AddDeliveryAddress to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_DelDeliveryAddress. */
    interface IC2GW_DelDeliveryAddress {

        /** C2GW_DelDeliveryAddress index */
        index?: (number|null);
    }

    /** Represents a C2GW_DelDeliveryAddress. */
    class C2GW_DelDeliveryAddress implements IC2GW_DelDeliveryAddress {

        /**
         * Constructs a new C2GW_DelDeliveryAddress.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_DelDeliveryAddress);

        /** C2GW_DelDeliveryAddress index. */
        public index: number;

        /**
         * Creates a new C2GW_DelDeliveryAddress instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_DelDeliveryAddress instance
         */
        public static create(properties?: msg.IC2GW_DelDeliveryAddress): msg.C2GW_DelDeliveryAddress;

        /**
         * Encodes the specified C2GW_DelDeliveryAddress message. Does not implicitly {@link msg.C2GW_DelDeliveryAddress.verify|verify} messages.
         * @param message C2GW_DelDeliveryAddress message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_DelDeliveryAddress, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_DelDeliveryAddress message, length delimited. Does not implicitly {@link msg.C2GW_DelDeliveryAddress.verify|verify} messages.
         * @param message C2GW_DelDeliveryAddress message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_DelDeliveryAddress, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_DelDeliveryAddress message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_DelDeliveryAddress
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_DelDeliveryAddress;

        /**
         * Decodes a C2GW_DelDeliveryAddress message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_DelDeliveryAddress
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_DelDeliveryAddress;

        /**
         * Verifies a C2GW_DelDeliveryAddress message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_DelDeliveryAddress message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_DelDeliveryAddress
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_DelDeliveryAddress;

        /**
         * Creates a plain object from a C2GW_DelDeliveryAddress message. Also converts values to other types if specified.
         * @param message C2GW_DelDeliveryAddress
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_DelDeliveryAddress, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_DelDeliveryAddress to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_ChangeDeliveryAddress. */
    interface IC2GW_ChangeDeliveryAddress {

        /** C2GW_ChangeDeliveryAddress index */
        index?: (number|null);

        /** C2GW_ChangeDeliveryAddress info */
        info?: (msg.IUserAddress|null);
    }

    /** Represents a C2GW_ChangeDeliveryAddress. */
    class C2GW_ChangeDeliveryAddress implements IC2GW_ChangeDeliveryAddress {

        /**
         * Constructs a new C2GW_ChangeDeliveryAddress.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_ChangeDeliveryAddress);

        /** C2GW_ChangeDeliveryAddress index. */
        public index: number;

        /** C2GW_ChangeDeliveryAddress info. */
        public info?: (msg.IUserAddress|null);

        /**
         * Creates a new C2GW_ChangeDeliveryAddress instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_ChangeDeliveryAddress instance
         */
        public static create(properties?: msg.IC2GW_ChangeDeliveryAddress): msg.C2GW_ChangeDeliveryAddress;

        /**
         * Encodes the specified C2GW_ChangeDeliveryAddress message. Does not implicitly {@link msg.C2GW_ChangeDeliveryAddress.verify|verify} messages.
         * @param message C2GW_ChangeDeliveryAddress message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_ChangeDeliveryAddress, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_ChangeDeliveryAddress message, length delimited. Does not implicitly {@link msg.C2GW_ChangeDeliveryAddress.verify|verify} messages.
         * @param message C2GW_ChangeDeliveryAddress message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_ChangeDeliveryAddress, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_ChangeDeliveryAddress message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_ChangeDeliveryAddress
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_ChangeDeliveryAddress;

        /**
         * Decodes a C2GW_ChangeDeliveryAddress message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_ChangeDeliveryAddress
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_ChangeDeliveryAddress;

        /**
         * Verifies a C2GW_ChangeDeliveryAddress message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_ChangeDeliveryAddress message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_ChangeDeliveryAddress
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_ChangeDeliveryAddress;

        /**
         * Creates a plain object from a C2GW_ChangeDeliveryAddress message. Also converts values to other types if specified.
         * @param message C2GW_ChangeDeliveryAddress
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_ChangeDeliveryAddress, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_ChangeDeliveryAddress to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_SendDeliveryAddressList. */
    interface IGW2C_SendDeliveryAddressList {

        /** GW2C_SendDeliveryAddressList list */
        list?: (msg.IUserAddress[]|null);
    }

    /** Represents a GW2C_SendDeliveryAddressList. */
    class GW2C_SendDeliveryAddressList implements IGW2C_SendDeliveryAddressList {

        /**
         * Constructs a new GW2C_SendDeliveryAddressList.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_SendDeliveryAddressList);

        /** GW2C_SendDeliveryAddressList list. */
        public list: msg.IUserAddress[];

        /**
         * Creates a new GW2C_SendDeliveryAddressList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_SendDeliveryAddressList instance
         */
        public static create(properties?: msg.IGW2C_SendDeliveryAddressList): msg.GW2C_SendDeliveryAddressList;

        /**
         * Encodes the specified GW2C_SendDeliveryAddressList message. Does not implicitly {@link msg.GW2C_SendDeliveryAddressList.verify|verify} messages.
         * @param message GW2C_SendDeliveryAddressList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_SendDeliveryAddressList, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_SendDeliveryAddressList message, length delimited. Does not implicitly {@link msg.GW2C_SendDeliveryAddressList.verify|verify} messages.
         * @param message GW2C_SendDeliveryAddressList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_SendDeliveryAddressList, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_SendDeliveryAddressList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_SendDeliveryAddressList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_SendDeliveryAddressList;

        /**
         * Decodes a GW2C_SendDeliveryAddressList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_SendDeliveryAddressList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_SendDeliveryAddressList;

        /**
         * Verifies a GW2C_SendDeliveryAddressList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_SendDeliveryAddressList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_SendDeliveryAddressList
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_SendDeliveryAddressList;

        /**
         * Creates a plain object from a GW2C_SendDeliveryAddressList message. Also converts values to other types if specified.
         * @param message GW2C_SendDeliveryAddressList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_SendDeliveryAddressList, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_SendDeliveryAddressList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DeliveryGoods. */
    interface IDeliveryGoods {

        /** DeliveryGoods itemid */
        itemid?: (number|null);

        /** DeliveryGoods num */
        num?: (number|null);
    }

    /** Represents a DeliveryGoods. */
    class DeliveryGoods implements IDeliveryGoods {

        /**
         * Constructs a new DeliveryGoods.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IDeliveryGoods);

        /** DeliveryGoods itemid. */
        public itemid: number;

        /** DeliveryGoods num. */
        public num: number;

        /**
         * Creates a new DeliveryGoods instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DeliveryGoods instance
         */
        public static create(properties?: msg.IDeliveryGoods): msg.DeliveryGoods;

        /**
         * Encodes the specified DeliveryGoods message. Does not implicitly {@link msg.DeliveryGoods.verify|verify} messages.
         * @param message DeliveryGoods message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IDeliveryGoods, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified DeliveryGoods message, length delimited. Does not implicitly {@link msg.DeliveryGoods.verify|verify} messages.
         * @param message DeliveryGoods message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IDeliveryGoods, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a DeliveryGoods message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DeliveryGoods
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.DeliveryGoods;

        /**
         * Decodes a DeliveryGoods message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DeliveryGoods
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.DeliveryGoods;

        /**
         * Verifies a DeliveryGoods message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DeliveryGoods message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DeliveryGoods
         */
        public static fromObject(object: { [k: string]: any }): msg.DeliveryGoods;

        /**
         * Creates a plain object from a DeliveryGoods message. Also converts values to other types if specified.
         * @param message DeliveryGoods
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.DeliveryGoods, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DeliveryGoods to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_ReqDeliveryGoods. */
    interface IC2GW_ReqDeliveryGoods {

        /** C2GW_ReqDeliveryGoods list */
        list?: (msg.IDeliveryGoods[]|null);

        /** C2GW_ReqDeliveryGoods token */
        token?: (string|null);
    }

    /** Represents a C2GW_ReqDeliveryGoods. */
    class C2GW_ReqDeliveryGoods implements IC2GW_ReqDeliveryGoods {

        /**
         * Constructs a new C2GW_ReqDeliveryGoods.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_ReqDeliveryGoods);

        /** C2GW_ReqDeliveryGoods list. */
        public list: msg.IDeliveryGoods[];

        /** C2GW_ReqDeliveryGoods token. */
        public token: string;

        /**
         * Creates a new C2GW_ReqDeliveryGoods instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_ReqDeliveryGoods instance
         */
        public static create(properties?: msg.IC2GW_ReqDeliveryGoods): msg.C2GW_ReqDeliveryGoods;

        /**
         * Encodes the specified C2GW_ReqDeliveryGoods message. Does not implicitly {@link msg.C2GW_ReqDeliveryGoods.verify|verify} messages.
         * @param message C2GW_ReqDeliveryGoods message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_ReqDeliveryGoods, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_ReqDeliveryGoods message, length delimited. Does not implicitly {@link msg.C2GW_ReqDeliveryGoods.verify|verify} messages.
         * @param message C2GW_ReqDeliveryGoods message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_ReqDeliveryGoods, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_ReqDeliveryGoods message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_ReqDeliveryGoods
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_ReqDeliveryGoods;

        /**
         * Decodes a C2GW_ReqDeliveryGoods message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_ReqDeliveryGoods
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_ReqDeliveryGoods;

        /**
         * Verifies a C2GW_ReqDeliveryGoods message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_ReqDeliveryGoods message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_ReqDeliveryGoods
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_ReqDeliveryGoods;

        /**
         * Creates a plain object from a C2GW_ReqDeliveryGoods message. Also converts values to other types if specified.
         * @param message C2GW_ReqDeliveryGoods
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_ReqDeliveryGoods, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_ReqDeliveryGoods to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EntityBase. */
    interface IEntityBase {

        /** EntityBase id */
        id?: (number|Long|null);

        /** EntityBase name */
        name?: (string|null);

        /** EntityBase head */
        head?: (string|null);

        /** EntityBase sex */
        sex?: (number|null);

        /** EntityBase account */
        account?: (string|null);
    }

    /** Represents an EntityBase. */
    class EntityBase implements IEntityBase {

        /**
         * Constructs a new EntityBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IEntityBase);

        /** EntityBase id. */
        public id: (number|Long);

        /** EntityBase name. */
        public name: string;

        /** EntityBase head. */
        public head: string;

        /** EntityBase sex. */
        public sex: number;

        /** EntityBase account. */
        public account: string;

        /**
         * Creates a new EntityBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EntityBase instance
         */
        public static create(properties?: msg.IEntityBase): msg.EntityBase;

        /**
         * Encodes the specified EntityBase message. Does not implicitly {@link msg.EntityBase.verify|verify} messages.
         * @param message EntityBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IEntityBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified EntityBase message, length delimited. Does not implicitly {@link msg.EntityBase.verify|verify} messages.
         * @param message EntityBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IEntityBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an EntityBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EntityBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.EntityBase;

        /**
         * Decodes an EntityBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EntityBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.EntityBase;

        /**
         * Verifies an EntityBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EntityBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EntityBase
         */
        public static fromObject(object: { [k: string]: any }): msg.EntityBase;

        /**
         * Creates a plain object from an EntityBase message. Also converts values to other types if specified.
         * @param message EntityBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.EntityBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EntityBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SimpleCounter. */
    interface ISimpleCounter {

        /** SimpleCounter freestep */
        freestep?: (number|null);

        /** SimpleCounter givestep */
        givestep?: (number|Long|null);

        /** SimpleCounter moneyCost */
        moneyCost?: (number|Long|null);

        /** SimpleCounter moneyCostReset */
        moneyCostReset?: (number|Long|null);
    }

    /** Represents a SimpleCounter. */
    class SimpleCounter implements ISimpleCounter {

        /**
         * Constructs a new SimpleCounter.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ISimpleCounter);

        /** SimpleCounter freestep. */
        public freestep: number;

        /** SimpleCounter givestep. */
        public givestep: (number|Long);

        /** SimpleCounter moneyCost. */
        public moneyCost: (number|Long);

        /** SimpleCounter moneyCostReset. */
        public moneyCostReset: (number|Long);

        /**
         * Creates a new SimpleCounter instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SimpleCounter instance
         */
        public static create(properties?: msg.ISimpleCounter): msg.SimpleCounter;

        /**
         * Encodes the specified SimpleCounter message. Does not implicitly {@link msg.SimpleCounter.verify|verify} messages.
         * @param message SimpleCounter message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ISimpleCounter, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified SimpleCounter message, length delimited. Does not implicitly {@link msg.SimpleCounter.verify|verify} messages.
         * @param message SimpleCounter message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ISimpleCounter, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a SimpleCounter message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SimpleCounter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.SimpleCounter;

        /**
         * Decodes a SimpleCounter message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SimpleCounter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.SimpleCounter;

        /**
         * Verifies a SimpleCounter message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SimpleCounter message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SimpleCounter
         */
        public static fromObject(object: { [k: string]: any }): msg.SimpleCounter;

        /**
         * Creates a plain object from a SimpleCounter message. Also converts values to other types if specified.
         * @param message SimpleCounter
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.SimpleCounter, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SimpleCounter to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a FreePresentMoney. */
    interface IFreePresentMoney {

        /** FreePresentMoney count */
        count?: (number|null);

        /** FreePresentMoney tmrecord */
        tmrecord?: (number|Long|null);
    }

    /** Represents a FreePresentMoney. */
    class FreePresentMoney implements IFreePresentMoney {

        /**
         * Constructs a new FreePresentMoney.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IFreePresentMoney);

        /** FreePresentMoney count. */
        public count: number;

        /** FreePresentMoney tmrecord. */
        public tmrecord: (number|Long);

        /**
         * Creates a new FreePresentMoney instance using the specified properties.
         * @param [properties] Properties to set
         * @returns FreePresentMoney instance
         */
        public static create(properties?: msg.IFreePresentMoney): msg.FreePresentMoney;

        /**
         * Encodes the specified FreePresentMoney message. Does not implicitly {@link msg.FreePresentMoney.verify|verify} messages.
         * @param message FreePresentMoney message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IFreePresentMoney, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified FreePresentMoney message, length delimited. Does not implicitly {@link msg.FreePresentMoney.verify|verify} messages.
         * @param message FreePresentMoney message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IFreePresentMoney, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a FreePresentMoney message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns FreePresentMoney
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.FreePresentMoney;

        /**
         * Decodes a FreePresentMoney message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns FreePresentMoney
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.FreePresentMoney;

        /**
         * Verifies a FreePresentMoney message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a FreePresentMoney message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns FreePresentMoney
         */
        public static fromObject(object: { [k: string]: any }): msg.FreePresentMoney;

        /**
         * Creates a plain object from a FreePresentMoney message. Also converts values to other types if specified.
         * @param message FreePresentMoney
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.FreePresentMoney, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this FreePresentMoney to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserWechat. */
    interface IUserWechat {

        /** UserWechat openid */
        openid?: (string|null);
    }

    /** Represents a UserWechat. */
    class UserWechat implements IUserWechat {

        /**
         * Constructs a new UserWechat.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IUserWechat);

        /** UserWechat openid. */
        public openid: string;

        /**
         * Creates a new UserWechat instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserWechat instance
         */
        public static create(properties?: msg.IUserWechat): msg.UserWechat;

        /**
         * Encodes the specified UserWechat message. Does not implicitly {@link msg.UserWechat.verify|verify} messages.
         * @param message UserWechat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IUserWechat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified UserWechat message, length delimited. Does not implicitly {@link msg.UserWechat.verify|verify} messages.
         * @param message UserWechat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IUserWechat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a UserWechat message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserWechat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.UserWechat;

        /**
         * Decodes a UserWechat message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserWechat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.UserWechat;

        /**
         * Verifies a UserWechat message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserWechat message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserWechat
         */
        public static fromObject(object: { [k: string]: any }): msg.UserWechat;

        /**
         * Creates a plain object from a UserWechat message. Also converts values to other types if specified.
         * @param message UserWechat
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.UserWechat, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserWechat to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserTask. */
    interface IUserTask {

        /** UserTask tasks */
        tasks?: (msg.ITaskData[]|null);
    }

    /** Represents a UserTask. */
    class UserTask implements IUserTask {

        /**
         * Constructs a new UserTask.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IUserTask);

        /** UserTask tasks. */
        public tasks: msg.ITaskData[];

        /**
         * Creates a new UserTask instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserTask instance
         */
        public static create(properties?: msg.IUserTask): msg.UserTask;

        /**
         * Encodes the specified UserTask message. Does not implicitly {@link msg.UserTask.verify|verify} messages.
         * @param message UserTask message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IUserTask, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified UserTask message, length delimited. Does not implicitly {@link msg.UserTask.verify|verify} messages.
         * @param message UserTask message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IUserTask, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a UserTask message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserTask
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.UserTask;

        /**
         * Decodes a UserTask message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserTask
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.UserTask;

        /**
         * Verifies a UserTask message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserTask message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserTask
         */
        public static fromObject(object: { [k: string]: any }): msg.UserTask;

        /**
         * Creates a plain object from a UserTask message. Also converts values to other types if specified.
         * @param message UserTask
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.UserTask, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserTask to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TaskData. */
    interface ITaskData {

        /** TaskData id */
        id?: (number|null);

        /** TaskData progress */
        progress?: (number|null);

        /** TaskData completed */
        completed?: (number|null);
    }

    /** Represents a TaskData. */
    class TaskData implements ITaskData {

        /**
         * Constructs a new TaskData.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ITaskData);

        /** TaskData id. */
        public id: number;

        /** TaskData progress. */
        public progress: number;

        /** TaskData completed. */
        public completed: number;

        /**
         * Creates a new TaskData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TaskData instance
         */
        public static create(properties?: msg.ITaskData): msg.TaskData;

        /**
         * Encodes the specified TaskData message. Does not implicitly {@link msg.TaskData.verify|verify} messages.
         * @param message TaskData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ITaskData, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TaskData message, length delimited. Does not implicitly {@link msg.TaskData.verify|verify} messages.
         * @param message TaskData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ITaskData, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TaskData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TaskData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.TaskData;

        /**
         * Decodes a TaskData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TaskData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.TaskData;

        /**
         * Verifies a TaskData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TaskData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TaskData
         */
        public static fromObject(object: { [k: string]: any }): msg.TaskData;

        /**
         * Creates a plain object from a TaskData message. Also converts values to other types if specified.
         * @param message TaskData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.TaskData, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TaskData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LuckyDrawItem. */
    interface ILuckyDrawItem {

        /** LuckyDrawItem time */
        time?: (number|Long|null);

        /** LuckyDrawItem item */
        item?: (number|null);

        /** LuckyDrawItem num */
        num?: (number|null);

        /** LuckyDrawItem worth */
        worth?: (number|null);
    }

    /** Represents a LuckyDrawItem. */
    class LuckyDrawItem implements ILuckyDrawItem {

        /**
         * Constructs a new LuckyDrawItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ILuckyDrawItem);

        /** LuckyDrawItem time. */
        public time: (number|Long);

        /** LuckyDrawItem item. */
        public item: number;

        /** LuckyDrawItem num. */
        public num: number;

        /** LuckyDrawItem worth. */
        public worth: number;

        /**
         * Creates a new LuckyDrawItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LuckyDrawItem instance
         */
        public static create(properties?: msg.ILuckyDrawItem): msg.LuckyDrawItem;

        /**
         * Encodes the specified LuckyDrawItem message. Does not implicitly {@link msg.LuckyDrawItem.verify|verify} messages.
         * @param message LuckyDrawItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ILuckyDrawItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified LuckyDrawItem message, length delimited. Does not implicitly {@link msg.LuckyDrawItem.verify|verify} messages.
         * @param message LuckyDrawItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ILuckyDrawItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a LuckyDrawItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LuckyDrawItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.LuckyDrawItem;

        /**
         * Decodes a LuckyDrawItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LuckyDrawItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.LuckyDrawItem;

        /**
         * Verifies a LuckyDrawItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LuckyDrawItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LuckyDrawItem
         */
        public static fromObject(object: { [k: string]: any }): msg.LuckyDrawItem;

        /**
         * Creates a plain object from a LuckyDrawItem message. Also converts values to other types if specified.
         * @param message LuckyDrawItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.LuckyDrawItem, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LuckyDrawItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LuckyDrawRecord. */
    interface ILuckyDrawRecord {

        /** LuckyDrawRecord drawlist */
        drawlist?: (msg.ILuckyDrawItem[]|null);

        /** LuckyDrawRecord totalvalue */
        totalvalue?: (number|Long|null);
    }

    /** Represents a LuckyDrawRecord. */
    class LuckyDrawRecord implements ILuckyDrawRecord {

        /**
         * Constructs a new LuckyDrawRecord.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ILuckyDrawRecord);

        /** LuckyDrawRecord drawlist. */
        public drawlist: msg.ILuckyDrawItem[];

        /** LuckyDrawRecord totalvalue. */
        public totalvalue: (number|Long);

        /**
         * Creates a new LuckyDrawRecord instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LuckyDrawRecord instance
         */
        public static create(properties?: msg.ILuckyDrawRecord): msg.LuckyDrawRecord;

        /**
         * Encodes the specified LuckyDrawRecord message. Does not implicitly {@link msg.LuckyDrawRecord.verify|verify} messages.
         * @param message LuckyDrawRecord message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ILuckyDrawRecord, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified LuckyDrawRecord message, length delimited. Does not implicitly {@link msg.LuckyDrawRecord.verify|verify} messages.
         * @param message LuckyDrawRecord message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ILuckyDrawRecord, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a LuckyDrawRecord message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LuckyDrawRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.LuckyDrawRecord;

        /**
         * Decodes a LuckyDrawRecord message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LuckyDrawRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.LuckyDrawRecord;

        /**
         * Verifies a LuckyDrawRecord message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LuckyDrawRecord message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LuckyDrawRecord
         */
        public static fromObject(object: { [k: string]: any }): msg.LuckyDrawRecord;

        /**
         * Creates a plain object from a LuckyDrawRecord message. Also converts values to other types if specified.
         * @param message LuckyDrawRecord
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.LuckyDrawRecord, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LuckyDrawRecord to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MapEvent. */
    interface IMapEvent {

        /** MapEvent id */
        id?: (number|Long|null);

        /** MapEvent tid */
        tid?: (number|null);

        /** MapEvent longitude */
        longitude?: (number|null);

        /** MapEvent latitude */
        latitude?: (number|null);
    }

    /** Represents a MapEvent. */
    class MapEvent implements IMapEvent {

        /**
         * Constructs a new MapEvent.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IMapEvent);

        /** MapEvent id. */
        public id: (number|Long);

        /** MapEvent tid. */
        public tid: number;

        /** MapEvent longitude. */
        public longitude: number;

        /** MapEvent latitude. */
        public latitude: number;

        /**
         * Creates a new MapEvent instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MapEvent instance
         */
        public static create(properties?: msg.IMapEvent): msg.MapEvent;

        /**
         * Encodes the specified MapEvent message. Does not implicitly {@link msg.MapEvent.verify|verify} messages.
         * @param message MapEvent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IMapEvent, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified MapEvent message, length delimited. Does not implicitly {@link msg.MapEvent.verify|verify} messages.
         * @param message MapEvent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IMapEvent, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a MapEvent message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MapEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.MapEvent;

        /**
         * Decodes a MapEvent message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MapEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.MapEvent;

        /**
         * Verifies a MapEvent message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MapEvent message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MapEvent
         */
        public static fromObject(object: { [k: string]: any }): msg.MapEvent;

        /**
         * Creates a plain object from a MapEvent message. Also converts values to other types if specified.
         * @param message MapEvent
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.MapEvent, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MapEvent to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserMapEvent. */
    interface IUserMapEvent {

        /** UserMapEvent events */
        events?: (msg.IMapEvent[]|null);

        /** UserMapEvent tmrefresh */
        tmrefresh?: (number|Long|null);
    }

    /** Represents a UserMapEvent. */
    class UserMapEvent implements IUserMapEvent {

        /**
         * Constructs a new UserMapEvent.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IUserMapEvent);

        /** UserMapEvent events. */
        public events: msg.IMapEvent[];

        /** UserMapEvent tmrefresh. */
        public tmrefresh: (number|Long);

        /**
         * Creates a new UserMapEvent instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserMapEvent instance
         */
        public static create(properties?: msg.IUserMapEvent): msg.UserMapEvent;

        /**
         * Encodes the specified UserMapEvent message. Does not implicitly {@link msg.UserMapEvent.verify|verify} messages.
         * @param message UserMapEvent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IUserMapEvent, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified UserMapEvent message, length delimited. Does not implicitly {@link msg.UserMapEvent.verify|verify} messages.
         * @param message UserMapEvent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IUserMapEvent, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a UserMapEvent message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserMapEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.UserMapEvent;

        /**
         * Decodes a UserMapEvent message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserMapEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.UserMapEvent;

        /**
         * Verifies a UserMapEvent message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserMapEvent message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserMapEvent
         */
        public static fromObject(object: { [k: string]: any }): msg.UserMapEvent;

        /**
         * Creates a plain object from a UserMapEvent message. Also converts values to other types if specified.
         * @param message UserMapEvent
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.UserMapEvent, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserMapEvent to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserBase. */
    interface IUserBase {

        /** UserBase level */
        level?: (number|null);

        /** UserBase exp */
        exp?: (number|null);

        /** UserBase gold */
        gold?: (number|null);

        /** UserBase diamond */
        diamond?: (number|null);

        /** UserBase yuanbao */
        yuanbao?: (number|null);

        /** UserBase tmlogin */
        tmlogin?: (number|Long|null);

        /** UserBase tmlogout */
        tmlogout?: (number|Long|null);

        /** UserBase continuelogin */
        continuelogin?: (number|null);

        /** UserBase nocountlogin */
        nocountlogin?: (number|null);

        /** UserBase signreward */
        signreward?: (number|null);

        /** UserBase signtime */
        signtime?: (number|null);

        /** UserBase invitationcode */
        invitationcode?: (string|null);

        /** UserBase totalRecharge */
        totalRecharge?: (number|null);

        /** UserBase addrlist */
        addrlist?: (msg.IUserAddress[]|null);

        /** UserBase scounter */
        scounter?: (msg.ISimpleCounter|null);

        /** UserBase wechat */
        wechat?: (msg.IUserWechat|null);

        /** UserBase task */
        task?: (msg.IUserTask|null);

        /** UserBase luckydraw */
        luckydraw?: (msg.ILuckyDrawRecord|null);

        /** UserBase mapevent */
        mapevent?: (msg.IUserMapEvent|null);
    }

    /** Represents a UserBase. */
    class UserBase implements IUserBase {

        /**
         * Constructs a new UserBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IUserBase);

        /** UserBase level. */
        public level: number;

        /** UserBase exp. */
        public exp: number;

        /** UserBase gold. */
        public gold: number;

        /** UserBase diamond. */
        public diamond: number;

        /** UserBase yuanbao. */
        public yuanbao: number;

        /** UserBase tmlogin. */
        public tmlogin: (number|Long);

        /** UserBase tmlogout. */
        public tmlogout: (number|Long);

        /** UserBase continuelogin. */
        public continuelogin: number;

        /** UserBase nocountlogin. */
        public nocountlogin: number;

        /** UserBase signreward. */
        public signreward: number;

        /** UserBase signtime. */
        public signtime: number;

        /** UserBase invitationcode. */
        public invitationcode: string;

        /** UserBase totalRecharge. */
        public totalRecharge: number;

        /** UserBase addrlist. */
        public addrlist: msg.IUserAddress[];

        /** UserBase scounter. */
        public scounter?: (msg.ISimpleCounter|null);

        /** UserBase wechat. */
        public wechat?: (msg.IUserWechat|null);

        /** UserBase task. */
        public task?: (msg.IUserTask|null);

        /** UserBase luckydraw. */
        public luckydraw?: (msg.ILuckyDrawRecord|null);

        /** UserBase mapevent. */
        public mapevent?: (msg.IUserMapEvent|null);

        /**
         * Creates a new UserBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserBase instance
         */
        public static create(properties?: msg.IUserBase): msg.UserBase;

        /**
         * Encodes the specified UserBase message. Does not implicitly {@link msg.UserBase.verify|verify} messages.
         * @param message UserBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IUserBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified UserBase message, length delimited. Does not implicitly {@link msg.UserBase.verify|verify} messages.
         * @param message UserBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IUserBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a UserBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.UserBase;

        /**
         * Decodes a UserBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.UserBase;

        /**
         * Verifies a UserBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserBase
         */
        public static fromObject(object: { [k: string]: any }): msg.UserBase;

        /**
         * Creates a plain object from a UserBase message. Also converts values to other types if specified.
         * @param message UserBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.UserBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserAddress. */
    interface IUserAddress {

        /** UserAddress receiver */
        receiver?: (string|null);

        /** UserAddress phone */
        phone?: (string|null);

        /** UserAddress address */
        address?: (string|null);
    }

    /** Represents a UserAddress. */
    class UserAddress implements IUserAddress {

        /**
         * Constructs a new UserAddress.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IUserAddress);

        /** UserAddress receiver. */
        public receiver: string;

        /** UserAddress phone. */
        public phone: string;

        /** UserAddress address. */
        public address: string;

        /**
         * Creates a new UserAddress instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserAddress instance
         */
        public static create(properties?: msg.IUserAddress): msg.UserAddress;

        /**
         * Encodes the specified UserAddress message. Does not implicitly {@link msg.UserAddress.verify|verify} messages.
         * @param message UserAddress message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IUserAddress, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified UserAddress message, length delimited. Does not implicitly {@link msg.UserAddress.verify|verify} messages.
         * @param message UserAddress message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IUserAddress, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a UserAddress message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserAddress
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.UserAddress;

        /**
         * Decodes a UserAddress message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserAddress
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.UserAddress;

        /**
         * Verifies a UserAddress message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserAddress message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserAddress
         */
        public static fromObject(object: { [k: string]: any }): msg.UserAddress;

        /**
         * Creates a plain object from a UserAddress message. Also converts values to other types if specified.
         * @param message UserAddress
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.UserAddress, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserAddress to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ItemData. */
    interface IItemData {

        /** ItemData id */
        id?: (number|null);

        /** ItemData num */
        num?: (number|null);

        /** ItemData pos */
        pos?: (number|null);
    }

    /** Represents an ItemData. */
    class ItemData implements IItemData {

        /**
         * Constructs a new ItemData.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IItemData);

        /** ItemData id. */
        public id: number;

        /** ItemData num. */
        public num: number;

        /** ItemData pos. */
        public pos: number;

        /**
         * Creates a new ItemData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ItemData instance
         */
        public static create(properties?: msg.IItemData): msg.ItemData;

        /**
         * Encodes the specified ItemData message. Does not implicitly {@link msg.ItemData.verify|verify} messages.
         * @param message ItemData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IItemData, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified ItemData message, length delimited. Does not implicitly {@link msg.ItemData.verify|verify} messages.
         * @param message ItemData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IItemData, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an ItemData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ItemData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.ItemData;

        /**
         * Decodes an ItemData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ItemData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.ItemData;

        /**
         * Verifies an ItemData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ItemData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ItemData
         */
        public static fromObject(object: { [k: string]: any }): msg.ItemData;

        /**
         * Creates a plain object from an ItemData message. Also converts values to other types if specified.
         * @param message ItemData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.ItemData, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ItemData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ItemBin. */
    interface IItemBin {

        /** ItemBin items */
        items?: (msg.IItemData[]|null);
    }

    /** Represents an ItemBin. */
    class ItemBin implements IItemBin {

        /**
         * Constructs a new ItemBin.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IItemBin);

        /** ItemBin items. */
        public items: msg.IItemData[];

        /**
         * Creates a new ItemBin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ItemBin instance
         */
        public static create(properties?: msg.IItemBin): msg.ItemBin;

        /**
         * Encodes the specified ItemBin message. Does not implicitly {@link msg.ItemBin.verify|verify} messages.
         * @param message ItemBin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IItemBin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified ItemBin message, length delimited. Does not implicitly {@link msg.ItemBin.verify|verify} messages.
         * @param message ItemBin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IItemBin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an ItemBin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ItemBin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.ItemBin;

        /**
         * Decodes an ItemBin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ItemBin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.ItemBin;

        /**
         * Verifies an ItemBin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ItemBin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ItemBin
         */
        public static fromObject(object: { [k: string]: any }): msg.ItemBin;

        /**
         * Creates a plain object from an ItemBin message. Also converts values to other types if specified.
         * @param message ItemBin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.ItemBin, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ItemBin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Serialize. */
    interface ISerialize {

        /** Serialize entity */
        entity?: (msg.IEntityBase|null);

        /** Serialize base */
        base?: (msg.IUserBase|null);

        /** Serialize item */
        item?: (msg.IItemBin|null);
    }

    /** Represents a Serialize. */
    class Serialize implements ISerialize {

        /**
         * Constructs a new Serialize.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ISerialize);

        /** Serialize entity. */
        public entity?: (msg.IEntityBase|null);

        /** Serialize base. */
        public base?: (msg.IUserBase|null);

        /** Serialize item. */
        public item?: (msg.IItemBin|null);

        /**
         * Creates a new Serialize instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Serialize instance
         */
        public static create(properties?: msg.ISerialize): msg.Serialize;

        /**
         * Encodes the specified Serialize message. Does not implicitly {@link msg.Serialize.verify|verify} messages.
         * @param message Serialize message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ISerialize, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified Serialize message, length delimited. Does not implicitly {@link msg.Serialize.verify|verify} messages.
         * @param message Serialize message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ISerialize, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a Serialize message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Serialize
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.Serialize;

        /**
         * Decodes a Serialize message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Serialize
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.Serialize;

        /**
         * Verifies a Serialize message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Serialize message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Serialize
         */
        public static fromObject(object: { [k: string]: any }): msg.Serialize;

        /**
         * Creates a plain object from a Serialize message. Also converts values to other types if specified.
         * @param message Serialize
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.Serialize, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Serialize to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_SendUserEvents. */
    interface IGW2C_SendUserEvents {

        /** GW2C_SendUserEvents event */
        event?: (msg.IUserMapEvent|null);
    }

    /** Represents a GW2C_SendUserEvents. */
    class GW2C_SendUserEvents implements IGW2C_SendUserEvents {

        /**
         * Constructs a new GW2C_SendUserEvents.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_SendUserEvents);

        /** GW2C_SendUserEvents event. */
        public event?: (msg.IUserMapEvent|null);

        /**
         * Creates a new GW2C_SendUserEvents instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_SendUserEvents instance
         */
        public static create(properties?: msg.IGW2C_SendUserEvents): msg.GW2C_SendUserEvents;

        /**
         * Encodes the specified GW2C_SendUserEvents message. Does not implicitly {@link msg.GW2C_SendUserEvents.verify|verify} messages.
         * @param message GW2C_SendUserEvents message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_SendUserEvents, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_SendUserEvents message, length delimited. Does not implicitly {@link msg.GW2C_SendUserEvents.verify|verify} messages.
         * @param message GW2C_SendUserEvents message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_SendUserEvents, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_SendUserEvents message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_SendUserEvents
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_SendUserEvents;

        /**
         * Decodes a GW2C_SendUserEvents message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_SendUserEvents
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_SendUserEvents;

        /**
         * Verifies a GW2C_SendUserEvents message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_SendUserEvents message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_SendUserEvents
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_SendUserEvents;

        /**
         * Creates a plain object from a GW2C_SendUserEvents message. Also converts values to other types if specified.
         * @param message GW2C_SendUserEvents
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_SendUserEvents, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_SendUserEvents to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_ReqEnterEvents. */
    interface IC2GW_ReqEnterEvents {

        /** C2GW_ReqEnterEvents uid */
        uid?: (number|Long|null);
    }

    /** Represents a C2GW_ReqEnterEvents. */
    class C2GW_ReqEnterEvents implements IC2GW_ReqEnterEvents {

        /**
         * Constructs a new C2GW_ReqEnterEvents.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_ReqEnterEvents);

        /** C2GW_ReqEnterEvents uid. */
        public uid: (number|Long);

        /**
         * Creates a new C2GW_ReqEnterEvents instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_ReqEnterEvents instance
         */
        public static create(properties?: msg.IC2GW_ReqEnterEvents): msg.C2GW_ReqEnterEvents;

        /**
         * Encodes the specified C2GW_ReqEnterEvents message. Does not implicitly {@link msg.C2GW_ReqEnterEvents.verify|verify} messages.
         * @param message C2GW_ReqEnterEvents message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_ReqEnterEvents, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_ReqEnterEvents message, length delimited. Does not implicitly {@link msg.C2GW_ReqEnterEvents.verify|verify} messages.
         * @param message C2GW_ReqEnterEvents message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_ReqEnterEvents, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_ReqEnterEvents message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_ReqEnterEvents
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_ReqEnterEvents;

        /**
         * Decodes a C2GW_ReqEnterEvents message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_ReqEnterEvents
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_ReqEnterEvents;

        /**
         * Verifies a C2GW_ReqEnterEvents message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_ReqEnterEvents message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_ReqEnterEvents
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_ReqEnterEvents;

        /**
         * Creates a plain object from a C2GW_ReqEnterEvents message. Also converts values to other types if specified.
         * @param message C2GW_ReqEnterEvents
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_ReqEnterEvents, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_ReqEnterEvents to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_RemoveEvent. */
    interface IGW2C_RemoveEvent {

        /** GW2C_RemoveEvent uid */
        uid?: (number|Long|null);
    }

    /** Represents a GW2C_RemoveEvent. */
    class GW2C_RemoveEvent implements IGW2C_RemoveEvent {

        /**
         * Constructs a new GW2C_RemoveEvent.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_RemoveEvent);

        /** GW2C_RemoveEvent uid. */
        public uid: (number|Long);

        /**
         * Creates a new GW2C_RemoveEvent instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_RemoveEvent instance
         */
        public static create(properties?: msg.IGW2C_RemoveEvent): msg.GW2C_RemoveEvent;

        /**
         * Encodes the specified GW2C_RemoveEvent message. Does not implicitly {@link msg.GW2C_RemoveEvent.verify|verify} messages.
         * @param message GW2C_RemoveEvent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_RemoveEvent, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_RemoveEvent message, length delimited. Does not implicitly {@link msg.GW2C_RemoveEvent.verify|verify} messages.
         * @param message GW2C_RemoveEvent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_RemoveEvent, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_RemoveEvent message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_RemoveEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_RemoveEvent;

        /**
         * Decodes a GW2C_RemoveEvent message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_RemoveEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_RemoveEvent;

        /**
         * Verifies a GW2C_RemoveEvent message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_RemoveEvent message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_RemoveEvent
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_RemoveEvent;

        /**
         * Creates a plain object from a GW2C_RemoveEvent message. Also converts values to other types if specified.
         * @param message GW2C_RemoveEvent
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_RemoveEvent, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_RemoveEvent to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_LeaveEvent. */
    interface IC2GW_LeaveEvent {

        /** C2GW_LeaveEvent uid */
        uid?: (number|Long|null);
    }

    /** Represents a C2GW_LeaveEvent. */
    class C2GW_LeaveEvent implements IC2GW_LeaveEvent {

        /**
         * Constructs a new C2GW_LeaveEvent.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_LeaveEvent);

        /** C2GW_LeaveEvent uid. */
        public uid: (number|Long);

        /**
         * Creates a new C2GW_LeaveEvent instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_LeaveEvent instance
         */
        public static create(properties?: msg.IC2GW_LeaveEvent): msg.C2GW_LeaveEvent;

        /**
         * Encodes the specified C2GW_LeaveEvent message. Does not implicitly {@link msg.C2GW_LeaveEvent.verify|verify} messages.
         * @param message C2GW_LeaveEvent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_LeaveEvent, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_LeaveEvent message, length delimited. Does not implicitly {@link msg.C2GW_LeaveEvent.verify|verify} messages.
         * @param message C2GW_LeaveEvent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_LeaveEvent, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_LeaveEvent message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_LeaveEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_LeaveEvent;

        /**
         * Decodes a C2GW_LeaveEvent message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_LeaveEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_LeaveEvent;

        /**
         * Verifies a C2GW_LeaveEvent message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_LeaveEvent message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_LeaveEvent
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_LeaveEvent;

        /**
         * Creates a plain object from a C2GW_LeaveEvent message. Also converts values to other types if specified.
         * @param message C2GW_LeaveEvent
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_LeaveEvent, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_LeaveEvent to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_EnterGameEvent. */
    interface IGW2C_EnterGameEvent {

        /** GW2C_EnterGameEvent uid */
        uid?: (number|Long|null);
    }

    /** Represents a GW2C_EnterGameEvent. */
    class GW2C_EnterGameEvent implements IGW2C_EnterGameEvent {

        /**
         * Constructs a new GW2C_EnterGameEvent.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_EnterGameEvent);

        /** GW2C_EnterGameEvent uid. */
        public uid: (number|Long);

        /**
         * Creates a new GW2C_EnterGameEvent instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_EnterGameEvent instance
         */
        public static create(properties?: msg.IGW2C_EnterGameEvent): msg.GW2C_EnterGameEvent;

        /**
         * Encodes the specified GW2C_EnterGameEvent message. Does not implicitly {@link msg.GW2C_EnterGameEvent.verify|verify} messages.
         * @param message GW2C_EnterGameEvent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_EnterGameEvent, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_EnterGameEvent message, length delimited. Does not implicitly {@link msg.GW2C_EnterGameEvent.verify|verify} messages.
         * @param message GW2C_EnterGameEvent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_EnterGameEvent, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_EnterGameEvent message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_EnterGameEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_EnterGameEvent;

        /**
         * Decodes a GW2C_EnterGameEvent message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_EnterGameEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_EnterGameEvent;

        /**
         * Verifies a GW2C_EnterGameEvent message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_EnterGameEvent message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_EnterGameEvent
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_EnterGameEvent;

        /**
         * Creates a plain object from a GW2C_EnterGameEvent message. Also converts values to other types if specified.
         * @param message GW2C_EnterGameEvent
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_EnterGameEvent, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_EnterGameEvent to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an InthourAutoResetValue. */
    interface IInthourAutoResetValue {

        /** InthourAutoResetValue id */
        id?: (number|null);

        /** InthourAutoResetValue hours */
        hours?: (number|null);

        /** InthourAutoResetValue value */
        value?: (number|Long|null);

        /** InthourAutoResetValue lastreset */
        lastreset?: (number|Long|null);
    }

    /** Represents an InthourAutoResetValue. */
    class InthourAutoResetValue implements IInthourAutoResetValue {

        /**
         * Constructs a new InthourAutoResetValue.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IInthourAutoResetValue);

        /** InthourAutoResetValue id. */
        public id: number;

        /** InthourAutoResetValue hours. */
        public hours: number;

        /** InthourAutoResetValue value. */
        public value: (number|Long);

        /** InthourAutoResetValue lastreset. */
        public lastreset: (number|Long);

        /**
         * Creates a new InthourAutoResetValue instance using the specified properties.
         * @param [properties] Properties to set
         * @returns InthourAutoResetValue instance
         */
        public static create(properties?: msg.IInthourAutoResetValue): msg.InthourAutoResetValue;

        /**
         * Encodes the specified InthourAutoResetValue message. Does not implicitly {@link msg.InthourAutoResetValue.verify|verify} messages.
         * @param message InthourAutoResetValue message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IInthourAutoResetValue, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified InthourAutoResetValue message, length delimited. Does not implicitly {@link msg.InthourAutoResetValue.verify|verify} messages.
         * @param message InthourAutoResetValue message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IInthourAutoResetValue, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an InthourAutoResetValue message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns InthourAutoResetValue
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.InthourAutoResetValue;

        /**
         * Decodes an InthourAutoResetValue message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns InthourAutoResetValue
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.InthourAutoResetValue;

        /**
         * Verifies an InthourAutoResetValue message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an InthourAutoResetValue message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns InthourAutoResetValue
         */
        public static fromObject(object: { [k: string]: any }): msg.InthourAutoResetValue;

        /**
         * Creates a plain object from an InthourAutoResetValue message. Also converts values to other types if specified.
         * @param message InthourAutoResetValue
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.InthourAutoResetValue, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this InthourAutoResetValue to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an InthourAutoResetManager. */
    interface IInthourAutoResetManager {

        /** InthourAutoResetManager values */
        values?: (msg.IInthourAutoResetValue[]|null);
    }

    /** Represents an InthourAutoResetManager. */
    class InthourAutoResetManager implements IInthourAutoResetManager {

        /**
         * Constructs a new InthourAutoResetManager.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IInthourAutoResetManager);

        /** InthourAutoResetManager values. */
        public values: msg.IInthourAutoResetValue[];

        /**
         * Creates a new InthourAutoResetManager instance using the specified properties.
         * @param [properties] Properties to set
         * @returns InthourAutoResetManager instance
         */
        public static create(properties?: msg.IInthourAutoResetManager): msg.InthourAutoResetManager;

        /**
         * Encodes the specified InthourAutoResetManager message. Does not implicitly {@link msg.InthourAutoResetManager.verify|verify} messages.
         * @param message InthourAutoResetManager message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IInthourAutoResetManager, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified InthourAutoResetManager message, length delimited. Does not implicitly {@link msg.InthourAutoResetManager.verify|verify} messages.
         * @param message InthourAutoResetManager message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IInthourAutoResetManager, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an InthourAutoResetManager message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns InthourAutoResetManager
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.InthourAutoResetManager;

        /**
         * Decodes an InthourAutoResetManager message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns InthourAutoResetManager
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.InthourAutoResetManager;

        /**
         * Verifies an InthourAutoResetManager message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an InthourAutoResetManager message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns InthourAutoResetManager
         */
        public static fromObject(object: { [k: string]: any }): msg.InthourAutoResetManager;

        /**
         * Creates a plain object from an InthourAutoResetManager message. Also converts values to other types if specified.
         * @param message InthourAutoResetManager
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.InthourAutoResetManager, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this InthourAutoResetManager to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_BuyItem. */
    interface IC2GW_BuyItem {

        /** C2GW_BuyItem productid */
        productid?: (number|null);

        /** C2GW_BuyItem num */
        num?: (number|null);
    }

    /** Represents a C2GW_BuyItem. */
    class C2GW_BuyItem implements IC2GW_BuyItem {

        /**
         * Constructs a new C2GW_BuyItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_BuyItem);

        /** C2GW_BuyItem productid. */
        public productid: number;

        /** C2GW_BuyItem num. */
        public num: number;

        /**
         * Creates a new C2GW_BuyItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_BuyItem instance
         */
        public static create(properties?: msg.IC2GW_BuyItem): msg.C2GW_BuyItem;

        /**
         * Encodes the specified C2GW_BuyItem message. Does not implicitly {@link msg.C2GW_BuyItem.verify|verify} messages.
         * @param message C2GW_BuyItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_BuyItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_BuyItem message, length delimited. Does not implicitly {@link msg.C2GW_BuyItem.verify|verify} messages.
         * @param message C2GW_BuyItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_BuyItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_BuyItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_BuyItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_BuyItem;

        /**
         * Decodes a C2GW_BuyItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_BuyItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_BuyItem;

        /**
         * Verifies a C2GW_BuyItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_BuyItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_BuyItem
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_BuyItem;

        /**
         * Creates a plain object from a C2GW_BuyItem message. Also converts values to other types if specified.
         * @param message C2GW_BuyItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_BuyItem, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_BuyItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_PushPackageItemAdd. */
    interface IGW2C_PushPackageItemAdd {

        /** GW2C_PushPackageItemAdd itemid */
        itemid?: (number|null);

        /** GW2C_PushPackageItemAdd num */
        num?: (number|null);
    }

    /** Represents a GW2C_PushPackageItemAdd. */
    class GW2C_PushPackageItemAdd implements IGW2C_PushPackageItemAdd {

        /**
         * Constructs a new GW2C_PushPackageItemAdd.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_PushPackageItemAdd);

        /** GW2C_PushPackageItemAdd itemid. */
        public itemid: number;

        /** GW2C_PushPackageItemAdd num. */
        public num: number;

        /**
         * Creates a new GW2C_PushPackageItemAdd instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_PushPackageItemAdd instance
         */
        public static create(properties?: msg.IGW2C_PushPackageItemAdd): msg.GW2C_PushPackageItemAdd;

        /**
         * Encodes the specified GW2C_PushPackageItemAdd message. Does not implicitly {@link msg.GW2C_PushPackageItemAdd.verify|verify} messages.
         * @param message GW2C_PushPackageItemAdd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_PushPackageItemAdd, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_PushPackageItemAdd message, length delimited. Does not implicitly {@link msg.GW2C_PushPackageItemAdd.verify|verify} messages.
         * @param message GW2C_PushPackageItemAdd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_PushPackageItemAdd, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_PushPackageItemAdd message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_PushPackageItemAdd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_PushPackageItemAdd;

        /**
         * Decodes a GW2C_PushPackageItemAdd message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_PushPackageItemAdd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_PushPackageItemAdd;

        /**
         * Verifies a GW2C_PushPackageItemAdd message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_PushPackageItemAdd message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_PushPackageItemAdd
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_PushPackageItemAdd;

        /**
         * Creates a plain object from a GW2C_PushPackageItemAdd message. Also converts values to other types if specified.
         * @param message GW2C_PushPackageItemAdd
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_PushPackageItemAdd, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_PushPackageItemAdd to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_PushPackageItemRemove. */
    interface IGW2C_PushPackageItemRemove {

        /** GW2C_PushPackageItemRemove itemid */
        itemid?: (number|null);

        /** GW2C_PushPackageItemRemove num */
        num?: (number|null);
    }

    /** Represents a GW2C_PushPackageItemRemove. */
    class GW2C_PushPackageItemRemove implements IGW2C_PushPackageItemRemove {

        /**
         * Constructs a new GW2C_PushPackageItemRemove.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_PushPackageItemRemove);

        /** GW2C_PushPackageItemRemove itemid. */
        public itemid: number;

        /** GW2C_PushPackageItemRemove num. */
        public num: number;

        /**
         * Creates a new GW2C_PushPackageItemRemove instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_PushPackageItemRemove instance
         */
        public static create(properties?: msg.IGW2C_PushPackageItemRemove): msg.GW2C_PushPackageItemRemove;

        /**
         * Encodes the specified GW2C_PushPackageItemRemove message. Does not implicitly {@link msg.GW2C_PushPackageItemRemove.verify|verify} messages.
         * @param message GW2C_PushPackageItemRemove message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_PushPackageItemRemove, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_PushPackageItemRemove message, length delimited. Does not implicitly {@link msg.GW2C_PushPackageItemRemove.verify|verify} messages.
         * @param message GW2C_PushPackageItemRemove message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_PushPackageItemRemove, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_PushPackageItemRemove message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_PushPackageItemRemove
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_PushPackageItemRemove;

        /**
         * Decodes a GW2C_PushPackageItemRemove message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_PushPackageItemRemove
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_PushPackageItemRemove;

        /**
         * Verifies a GW2C_PushPackageItemRemove message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_PushPackageItemRemove message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_PushPackageItemRemove
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_PushPackageItemRemove;

        /**
         * Creates a plain object from a GW2C_PushPackageItemRemove message. Also converts values to other types if specified.
         * @param message GW2C_PushPackageItemRemove
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_PushPackageItemRemove, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_PushPackageItemRemove to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_PushGoldUpdate. */
    interface IGW2C_PushGoldUpdate {

        /** GW2C_PushGoldUpdate num */
        num?: (number|null);
    }

    /** Represents a GW2C_PushGoldUpdate. */
    class GW2C_PushGoldUpdate implements IGW2C_PushGoldUpdate {

        /**
         * Constructs a new GW2C_PushGoldUpdate.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_PushGoldUpdate);

        /** GW2C_PushGoldUpdate num. */
        public num: number;

        /**
         * Creates a new GW2C_PushGoldUpdate instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_PushGoldUpdate instance
         */
        public static create(properties?: msg.IGW2C_PushGoldUpdate): msg.GW2C_PushGoldUpdate;

        /**
         * Encodes the specified GW2C_PushGoldUpdate message. Does not implicitly {@link msg.GW2C_PushGoldUpdate.verify|verify} messages.
         * @param message GW2C_PushGoldUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_PushGoldUpdate, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_PushGoldUpdate message, length delimited. Does not implicitly {@link msg.GW2C_PushGoldUpdate.verify|verify} messages.
         * @param message GW2C_PushGoldUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_PushGoldUpdate, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_PushGoldUpdate message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_PushGoldUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_PushGoldUpdate;

        /**
         * Decodes a GW2C_PushGoldUpdate message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_PushGoldUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_PushGoldUpdate;

        /**
         * Verifies a GW2C_PushGoldUpdate message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_PushGoldUpdate message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_PushGoldUpdate
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_PushGoldUpdate;

        /**
         * Creates a plain object from a GW2C_PushGoldUpdate message. Also converts values to other types if specified.
         * @param message GW2C_PushGoldUpdate
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_PushGoldUpdate, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_PushGoldUpdate to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_PushYuanBaoUpdate. */
    interface IGW2C_PushYuanBaoUpdate {

        /** GW2C_PushYuanBaoUpdate num */
        num?: (number|null);
    }

    /** Represents a GW2C_PushYuanBaoUpdate. */
    class GW2C_PushYuanBaoUpdate implements IGW2C_PushYuanBaoUpdate {

        /**
         * Constructs a new GW2C_PushYuanBaoUpdate.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_PushYuanBaoUpdate);

        /** GW2C_PushYuanBaoUpdate num. */
        public num: number;

        /**
         * Creates a new GW2C_PushYuanBaoUpdate instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_PushYuanBaoUpdate instance
         */
        public static create(properties?: msg.IGW2C_PushYuanBaoUpdate): msg.GW2C_PushYuanBaoUpdate;

        /**
         * Encodes the specified GW2C_PushYuanBaoUpdate message. Does not implicitly {@link msg.GW2C_PushYuanBaoUpdate.verify|verify} messages.
         * @param message GW2C_PushYuanBaoUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_PushYuanBaoUpdate, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_PushYuanBaoUpdate message, length delimited. Does not implicitly {@link msg.GW2C_PushYuanBaoUpdate.verify|verify} messages.
         * @param message GW2C_PushYuanBaoUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_PushYuanBaoUpdate, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_PushYuanBaoUpdate message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_PushYuanBaoUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_PushYuanBaoUpdate;

        /**
         * Decodes a GW2C_PushYuanBaoUpdate message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_PushYuanBaoUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_PushYuanBaoUpdate;

        /**
         * Verifies a GW2C_PushYuanBaoUpdate message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_PushYuanBaoUpdate message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_PushYuanBaoUpdate
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_PushYuanBaoUpdate;

        /**
         * Creates a plain object from a GW2C_PushYuanBaoUpdate message. Also converts values to other types if specified.
         * @param message GW2C_PushYuanBaoUpdate
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_PushYuanBaoUpdate, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_PushYuanBaoUpdate to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_PushDiamondUpdate. */
    interface IGW2C_PushDiamondUpdate {

        /** GW2C_PushDiamondUpdate num */
        num?: (number|null);
    }

    /** Represents a GW2C_PushDiamondUpdate. */
    class GW2C_PushDiamondUpdate implements IGW2C_PushDiamondUpdate {

        /**
         * Constructs a new GW2C_PushDiamondUpdate.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_PushDiamondUpdate);

        /** GW2C_PushDiamondUpdate num. */
        public num: number;

        /**
         * Creates a new GW2C_PushDiamondUpdate instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_PushDiamondUpdate instance
         */
        public static create(properties?: msg.IGW2C_PushDiamondUpdate): msg.GW2C_PushDiamondUpdate;

        /**
         * Encodes the specified GW2C_PushDiamondUpdate message. Does not implicitly {@link msg.GW2C_PushDiamondUpdate.verify|verify} messages.
         * @param message GW2C_PushDiamondUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_PushDiamondUpdate, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_PushDiamondUpdate message, length delimited. Does not implicitly {@link msg.GW2C_PushDiamondUpdate.verify|verify} messages.
         * @param message GW2C_PushDiamondUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_PushDiamondUpdate, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_PushDiamondUpdate message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_PushDiamondUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_PushDiamondUpdate;

        /**
         * Decodes a GW2C_PushDiamondUpdate message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_PushDiamondUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_PushDiamondUpdate;

        /**
         * Verifies a GW2C_PushDiamondUpdate message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_PushDiamondUpdate message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_PushDiamondUpdate
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_PushDiamondUpdate;

        /**
         * Creates a plain object from a GW2C_PushDiamondUpdate message. Also converts values to other types if specified.
         * @param message GW2C_PushDiamondUpdate
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_PushDiamondUpdate, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_PushDiamondUpdate to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_PushItemPosUpdate. */
    interface IGW2C_PushItemPosUpdate {

        /** GW2C_PushItemPosUpdate items */
        items?: (msg.IItemData[]|null);
    }

    /** Represents a GW2C_PushItemPosUpdate. */
    class GW2C_PushItemPosUpdate implements IGW2C_PushItemPosUpdate {

        /**
         * Constructs a new GW2C_PushItemPosUpdate.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_PushItemPosUpdate);

        /** GW2C_PushItemPosUpdate items. */
        public items: msg.IItemData[];

        /**
         * Creates a new GW2C_PushItemPosUpdate instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_PushItemPosUpdate instance
         */
        public static create(properties?: msg.IGW2C_PushItemPosUpdate): msg.GW2C_PushItemPosUpdate;

        /**
         * Encodes the specified GW2C_PushItemPosUpdate message. Does not implicitly {@link msg.GW2C_PushItemPosUpdate.verify|verify} messages.
         * @param message GW2C_PushItemPosUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_PushItemPosUpdate, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_PushItemPosUpdate message, length delimited. Does not implicitly {@link msg.GW2C_PushItemPosUpdate.verify|verify} messages.
         * @param message GW2C_PushItemPosUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_PushItemPosUpdate, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_PushItemPosUpdate message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_PushItemPosUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_PushItemPosUpdate;

        /**
         * Decodes a GW2C_PushItemPosUpdate message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_PushItemPosUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_PushItemPosUpdate;

        /**
         * Verifies a GW2C_PushItemPosUpdate message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_PushItemPosUpdate message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_PushItemPosUpdate
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_PushItemPosUpdate;

        /**
         * Creates a plain object from a GW2C_PushItemPosUpdate message. Also converts values to other types if specified.
         * @param message GW2C_PushItemPosUpdate
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_PushItemPosUpdate, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_PushItemPosUpdate to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_GoldExchange. */
    interface IC2GW_GoldExchange {

        /** C2GW_GoldExchange userid */
        userid?: (number|Long|null);

        /** C2GW_GoldExchange diamonds */
        diamonds?: (number|null);
    }

    /** Represents a C2GW_GoldExchange. */
    class C2GW_GoldExchange implements IC2GW_GoldExchange {

        /**
         * Constructs a new C2GW_GoldExchange.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_GoldExchange);

        /** C2GW_GoldExchange userid. */
        public userid: (number|Long);

        /** C2GW_GoldExchange diamonds. */
        public diamonds: number;

        /**
         * Creates a new C2GW_GoldExchange instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_GoldExchange instance
         */
        public static create(properties?: msg.IC2GW_GoldExchange): msg.C2GW_GoldExchange;

        /**
         * Encodes the specified C2GW_GoldExchange message. Does not implicitly {@link msg.C2GW_GoldExchange.verify|verify} messages.
         * @param message C2GW_GoldExchange message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_GoldExchange, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_GoldExchange message, length delimited. Does not implicitly {@link msg.C2GW_GoldExchange.verify|verify} messages.
         * @param message C2GW_GoldExchange message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_GoldExchange, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_GoldExchange message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_GoldExchange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_GoldExchange;

        /**
         * Decodes a C2GW_GoldExchange message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_GoldExchange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_GoldExchange;

        /**
         * Verifies a C2GW_GoldExchange message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_GoldExchange message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_GoldExchange
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_GoldExchange;

        /**
         * Creates a plain object from a C2GW_GoldExchange message. Also converts values to other types if specified.
         * @param message C2GW_GoldExchange
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_GoldExchange, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_GoldExchange to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_ReqUseBagItem. */
    interface IC2GW_ReqUseBagItem {

        /** C2GW_ReqUseBagItem itemid */
        itemid?: (number|null);

        /** C2GW_ReqUseBagItem num */
        num?: (number|null);
    }

    /** Represents a C2GW_ReqUseBagItem. */
    class C2GW_ReqUseBagItem implements IC2GW_ReqUseBagItem {

        /**
         * Constructs a new C2GW_ReqUseBagItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_ReqUseBagItem);

        /** C2GW_ReqUseBagItem itemid. */
        public itemid: number;

        /** C2GW_ReqUseBagItem num. */
        public num: number;

        /**
         * Creates a new C2GW_ReqUseBagItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_ReqUseBagItem instance
         */
        public static create(properties?: msg.IC2GW_ReqUseBagItem): msg.C2GW_ReqUseBagItem;

        /**
         * Encodes the specified C2GW_ReqUseBagItem message. Does not implicitly {@link msg.C2GW_ReqUseBagItem.verify|verify} messages.
         * @param message C2GW_ReqUseBagItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_ReqUseBagItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_ReqUseBagItem message, length delimited. Does not implicitly {@link msg.C2GW_ReqUseBagItem.verify|verify} messages.
         * @param message C2GW_ReqUseBagItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_ReqUseBagItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_ReqUseBagItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_ReqUseBagItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_ReqUseBagItem;

        /**
         * Decodes a C2GW_ReqUseBagItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_ReqUseBagItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_ReqUseBagItem;

        /**
         * Verifies a C2GW_ReqUseBagItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_ReqUseBagItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_ReqUseBagItem
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_ReqUseBagItem;

        /**
         * Creates a plain object from a C2GW_ReqUseBagItem message. Also converts values to other types if specified.
         * @param message C2GW_ReqUseBagItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_ReqUseBagItem, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_ReqUseBagItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_RetGoldExchange. */
    interface IGW2C_RetGoldExchange {

        /** GW2C_RetGoldExchange gold */
        gold?: (number|null);
    }

    /** Represents a GW2C_RetGoldExchange. */
    class GW2C_RetGoldExchange implements IGW2C_RetGoldExchange {

        /**
         * Constructs a new GW2C_RetGoldExchange.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_RetGoldExchange);

        /** GW2C_RetGoldExchange gold. */
        public gold: number;

        /**
         * Creates a new GW2C_RetGoldExchange instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_RetGoldExchange instance
         */
        public static create(properties?: msg.IGW2C_RetGoldExchange): msg.GW2C_RetGoldExchange;

        /**
         * Encodes the specified GW2C_RetGoldExchange message. Does not implicitly {@link msg.GW2C_RetGoldExchange.verify|verify} messages.
         * @param message GW2C_RetGoldExchange message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_RetGoldExchange, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_RetGoldExchange message, length delimited. Does not implicitly {@link msg.GW2C_RetGoldExchange.verify|verify} messages.
         * @param message GW2C_RetGoldExchange message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_RetGoldExchange, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_RetGoldExchange message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_RetGoldExchange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_RetGoldExchange;

        /**
         * Decodes a GW2C_RetGoldExchange message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_RetGoldExchange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_RetGoldExchange;

        /**
         * Verifies a GW2C_RetGoldExchange message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_RetGoldExchange message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_RetGoldExchange
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_RetGoldExchange;

        /**
         * Creates a plain object from a GW2C_RetGoldExchange message. Also converts values to other types if specified.
         * @param message GW2C_RetGoldExchange
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_RetGoldExchange, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_RetGoldExchange to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2L_ReqLogin. */
    interface IC2L_ReqLogin {

        /** C2L_ReqLogin account */
        account?: (string|null);

        /** C2L_ReqLogin passwd */
        passwd?: (string|null);
    }

    /** Represents a C2L_ReqLogin. */
    class C2L_ReqLogin implements IC2L_ReqLogin {

        /**
         * Constructs a new C2L_ReqLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2L_ReqLogin);

        /** C2L_ReqLogin account. */
        public account: string;

        /** C2L_ReqLogin passwd. */
        public passwd: string;

        /**
         * Creates a new C2L_ReqLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2L_ReqLogin instance
         */
        public static create(properties?: msg.IC2L_ReqLogin): msg.C2L_ReqLogin;

        /**
         * Encodes the specified C2L_ReqLogin message. Does not implicitly {@link msg.C2L_ReqLogin.verify|verify} messages.
         * @param message C2L_ReqLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2L_ReqLogin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2L_ReqLogin message, length delimited. Does not implicitly {@link msg.C2L_ReqLogin.verify|verify} messages.
         * @param message C2L_ReqLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2L_ReqLogin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2L_ReqLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2L_ReqLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2L_ReqLogin;

        /**
         * Decodes a C2L_ReqLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2L_ReqLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2L_ReqLogin;

        /**
         * Verifies a C2L_ReqLogin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2L_ReqLogin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2L_ReqLogin
         */
        public static fromObject(object: { [k: string]: any }): msg.C2L_ReqLogin;

        /**
         * Creates a plain object from a C2L_ReqLogin message. Also converts values to other types if specified.
         * @param message C2L_ReqLogin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2L_ReqLogin, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2L_ReqLogin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2L_ReqLoginWechat. */
    interface IC2L_ReqLoginWechat {

        /** C2L_ReqLoginWechat openid */
        openid?: (string|null);

        /** C2L_ReqLoginWechat head */
        head?: (string|null);

        /** C2L_ReqLoginWechat nickname */
        nickname?: (string|null);

        /** C2L_ReqLoginWechat invitationcode */
        invitationcode?: (string|null);
    }

    /** Represents a C2L_ReqLoginWechat. */
    class C2L_ReqLoginWechat implements IC2L_ReqLoginWechat {

        /**
         * Constructs a new C2L_ReqLoginWechat.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2L_ReqLoginWechat);

        /** C2L_ReqLoginWechat openid. */
        public openid: string;

        /** C2L_ReqLoginWechat head. */
        public head: string;

        /** C2L_ReqLoginWechat nickname. */
        public nickname: string;

        /** C2L_ReqLoginWechat invitationcode. */
        public invitationcode: string;

        /**
         * Creates a new C2L_ReqLoginWechat instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2L_ReqLoginWechat instance
         */
        public static create(properties?: msg.IC2L_ReqLoginWechat): msg.C2L_ReqLoginWechat;

        /**
         * Encodes the specified C2L_ReqLoginWechat message. Does not implicitly {@link msg.C2L_ReqLoginWechat.verify|verify} messages.
         * @param message C2L_ReqLoginWechat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2L_ReqLoginWechat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2L_ReqLoginWechat message, length delimited. Does not implicitly {@link msg.C2L_ReqLoginWechat.verify|verify} messages.
         * @param message C2L_ReqLoginWechat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2L_ReqLoginWechat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2L_ReqLoginWechat message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2L_ReqLoginWechat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2L_ReqLoginWechat;

        /**
         * Decodes a C2L_ReqLoginWechat message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2L_ReqLoginWechat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2L_ReqLoginWechat;

        /**
         * Verifies a C2L_ReqLoginWechat message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2L_ReqLoginWechat message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2L_ReqLoginWechat
         */
        public static fromObject(object: { [k: string]: any }): msg.C2L_ReqLoginWechat;

        /**
         * Creates a plain object from a C2L_ReqLoginWechat message. Also converts values to other types if specified.
         * @param message C2L_ReqLoginWechat
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2L_ReqLoginWechat, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2L_ReqLoginWechat to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a L2C_RetLogin. */
    interface IL2C_RetLogin {

        /** L2C_RetLogin result */
        result?: (number|null);

        /** L2C_RetLogin reason */
        reason?: (string|null);

        /** L2C_RetLogin gatehost */
        gatehost?: (msg.IIpHost|null);

        /** L2C_RetLogin verifykey */
        verifykey?: (string|null);
    }

    /** Represents a L2C_RetLogin. */
    class L2C_RetLogin implements IL2C_RetLogin {

        /**
         * Constructs a new L2C_RetLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IL2C_RetLogin);

        /** L2C_RetLogin result. */
        public result: number;

        /** L2C_RetLogin reason. */
        public reason: string;

        /** L2C_RetLogin gatehost. */
        public gatehost?: (msg.IIpHost|null);

        /** L2C_RetLogin verifykey. */
        public verifykey: string;

        /**
         * Creates a new L2C_RetLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2C_RetLogin instance
         */
        public static create(properties?: msg.IL2C_RetLogin): msg.L2C_RetLogin;

        /**
         * Encodes the specified L2C_RetLogin message. Does not implicitly {@link msg.L2C_RetLogin.verify|verify} messages.
         * @param message L2C_RetLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IL2C_RetLogin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified L2C_RetLogin message, length delimited. Does not implicitly {@link msg.L2C_RetLogin.verify|verify} messages.
         * @param message L2C_RetLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IL2C_RetLogin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a L2C_RetLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns L2C_RetLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.L2C_RetLogin;

        /**
         * Decodes a L2C_RetLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns L2C_RetLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.L2C_RetLogin;

        /**
         * Verifies a L2C_RetLogin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a L2C_RetLogin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns L2C_RetLogin
         */
        public static fromObject(object: { [k: string]: any }): msg.L2C_RetLogin;

        /**
         * Creates a plain object from a L2C_RetLogin message. Also converts values to other types if specified.
         * @param message L2C_RetLogin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.L2C_RetLogin, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this L2C_RetLogin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2L_ReqRegistAuthCode. */
    interface IC2L_ReqRegistAuthCode {

        /** C2L_ReqRegistAuthCode phone */
        phone?: (string|null);
    }

    /** Represents a C2L_ReqRegistAuthCode. */
    class C2L_ReqRegistAuthCode implements IC2L_ReqRegistAuthCode {

        /**
         * Constructs a new C2L_ReqRegistAuthCode.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2L_ReqRegistAuthCode);

        /** C2L_ReqRegistAuthCode phone. */
        public phone: string;

        /**
         * Creates a new C2L_ReqRegistAuthCode instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2L_ReqRegistAuthCode instance
         */
        public static create(properties?: msg.IC2L_ReqRegistAuthCode): msg.C2L_ReqRegistAuthCode;

        /**
         * Encodes the specified C2L_ReqRegistAuthCode message. Does not implicitly {@link msg.C2L_ReqRegistAuthCode.verify|verify} messages.
         * @param message C2L_ReqRegistAuthCode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2L_ReqRegistAuthCode, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2L_ReqRegistAuthCode message, length delimited. Does not implicitly {@link msg.C2L_ReqRegistAuthCode.verify|verify} messages.
         * @param message C2L_ReqRegistAuthCode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2L_ReqRegistAuthCode, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2L_ReqRegistAuthCode message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2L_ReqRegistAuthCode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2L_ReqRegistAuthCode;

        /**
         * Decodes a C2L_ReqRegistAuthCode message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2L_ReqRegistAuthCode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2L_ReqRegistAuthCode;

        /**
         * Verifies a C2L_ReqRegistAuthCode message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2L_ReqRegistAuthCode message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2L_ReqRegistAuthCode
         */
        public static fromObject(object: { [k: string]: any }): msg.C2L_ReqRegistAuthCode;

        /**
         * Creates a plain object from a C2L_ReqRegistAuthCode message. Also converts values to other types if specified.
         * @param message C2L_ReqRegistAuthCode
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2L_ReqRegistAuthCode, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2L_ReqRegistAuthCode to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2L_ReqRegistAccount. */
    interface IC2L_ReqRegistAccount {

        /** C2L_ReqRegistAccount phone */
        phone?: (string|null);

        /** C2L_ReqRegistAccount passwd */
        passwd?: (string|null);

        /** C2L_ReqRegistAccount authcode */
        authcode?: (string|null);

        /** C2L_ReqRegistAccount invitationcode */
        invitationcode?: (string|null);

        /** C2L_ReqRegistAccount nickname */
        nickname?: (string|null);
    }

    /** Represents a C2L_ReqRegistAccount. */
    class C2L_ReqRegistAccount implements IC2L_ReqRegistAccount {

        /**
         * Constructs a new C2L_ReqRegistAccount.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2L_ReqRegistAccount);

        /** C2L_ReqRegistAccount phone. */
        public phone: string;

        /** C2L_ReqRegistAccount passwd. */
        public passwd: string;

        /** C2L_ReqRegistAccount authcode. */
        public authcode: string;

        /** C2L_ReqRegistAccount invitationcode. */
        public invitationcode: string;

        /** C2L_ReqRegistAccount nickname. */
        public nickname: string;

        /**
         * Creates a new C2L_ReqRegistAccount instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2L_ReqRegistAccount instance
         */
        public static create(properties?: msg.IC2L_ReqRegistAccount): msg.C2L_ReqRegistAccount;

        /**
         * Encodes the specified C2L_ReqRegistAccount message. Does not implicitly {@link msg.C2L_ReqRegistAccount.verify|verify} messages.
         * @param message C2L_ReqRegistAccount message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2L_ReqRegistAccount, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2L_ReqRegistAccount message, length delimited. Does not implicitly {@link msg.C2L_ReqRegistAccount.verify|verify} messages.
         * @param message C2L_ReqRegistAccount message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2L_ReqRegistAccount, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2L_ReqRegistAccount message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2L_ReqRegistAccount
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2L_ReqRegistAccount;

        /**
         * Decodes a C2L_ReqRegistAccount message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2L_ReqRegistAccount
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2L_ReqRegistAccount;

        /**
         * Verifies a C2L_ReqRegistAccount message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2L_ReqRegistAccount message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2L_ReqRegistAccount
         */
        public static fromObject(object: { [k: string]: any }): msg.C2L_ReqRegistAccount;

        /**
         * Creates a plain object from a C2L_ReqRegistAccount message. Also converts values to other types if specified.
         * @param message C2L_ReqRegistAccount
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2L_ReqRegistAccount, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2L_ReqRegistAccount to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a L2C_RetRegistAccount. */
    interface IL2C_RetRegistAccount {

        /** L2C_RetRegistAccount errcode */
        errcode?: (string|null);
    }

    /** Represents a L2C_RetRegistAccount. */
    class L2C_RetRegistAccount implements IL2C_RetRegistAccount {

        /**
         * Constructs a new L2C_RetRegistAccount.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IL2C_RetRegistAccount);

        /** L2C_RetRegistAccount errcode. */
        public errcode: string;

        /**
         * Creates a new L2C_RetRegistAccount instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2C_RetRegistAccount instance
         */
        public static create(properties?: msg.IL2C_RetRegistAccount): msg.L2C_RetRegistAccount;

        /**
         * Encodes the specified L2C_RetRegistAccount message. Does not implicitly {@link msg.L2C_RetRegistAccount.verify|verify} messages.
         * @param message L2C_RetRegistAccount message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IL2C_RetRegistAccount, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified L2C_RetRegistAccount message, length delimited. Does not implicitly {@link msg.L2C_RetRegistAccount.verify|verify} messages.
         * @param message L2C_RetRegistAccount message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IL2C_RetRegistAccount, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a L2C_RetRegistAccount message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns L2C_RetRegistAccount
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.L2C_RetRegistAccount;

        /**
         * Decodes a L2C_RetRegistAccount message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns L2C_RetRegistAccount
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.L2C_RetRegistAccount;

        /**
         * Verifies a L2C_RetRegistAccount message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a L2C_RetRegistAccount message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns L2C_RetRegistAccount
         */
        public static fromObject(object: { [k: string]: any }): msg.L2C_RetRegistAccount;

        /**
         * Creates a plain object from a L2C_RetRegistAccount message. Also converts values to other types if specified.
         * @param message L2C_RetRegistAccount
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.L2C_RetRegistAccount, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this L2C_RetRegistAccount to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_ReqLogin. */
    interface IC2GW_ReqLogin {

        /** C2GW_ReqLogin account */
        account?: (string|null);

        /** C2GW_ReqLogin verifykey */
        verifykey?: (string|null);

        /** C2GW_ReqLogin token */
        token?: (string|null);

        /** C2GW_ReqLogin head */
        head?: (string|null);
    }

    /** Represents a C2GW_ReqLogin. */
    class C2GW_ReqLogin implements IC2GW_ReqLogin {

        /**
         * Constructs a new C2GW_ReqLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_ReqLogin);

        /** C2GW_ReqLogin account. */
        public account: string;

        /** C2GW_ReqLogin verifykey. */
        public verifykey: string;

        /** C2GW_ReqLogin token. */
        public token: string;

        /** C2GW_ReqLogin head. */
        public head: string;

        /**
         * Creates a new C2GW_ReqLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_ReqLogin instance
         */
        public static create(properties?: msg.IC2GW_ReqLogin): msg.C2GW_ReqLogin;

        /**
         * Encodes the specified C2GW_ReqLogin message. Does not implicitly {@link msg.C2GW_ReqLogin.verify|verify} messages.
         * @param message C2GW_ReqLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_ReqLogin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_ReqLogin message, length delimited. Does not implicitly {@link msg.C2GW_ReqLogin.verify|verify} messages.
         * @param message C2GW_ReqLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_ReqLogin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_ReqLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_ReqLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_ReqLogin;

        /**
         * Decodes a C2GW_ReqLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_ReqLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_ReqLogin;

        /**
         * Verifies a C2GW_ReqLogin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_ReqLogin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_ReqLogin
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_ReqLogin;

        /**
         * Creates a plain object from a C2GW_ReqLogin message. Also converts values to other types if specified.
         * @param message C2GW_ReqLogin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_ReqLogin, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_ReqLogin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_RetLogin. */
    interface IGW2C_RetLogin {

        /** GW2C_RetLogin errcode */
        errcode?: (string|null);
    }

    /** Represents a GW2C_RetLogin. */
    class GW2C_RetLogin implements IGW2C_RetLogin {

        /**
         * Constructs a new GW2C_RetLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_RetLogin);

        /** GW2C_RetLogin errcode. */
        public errcode: string;

        /**
         * Creates a new GW2C_RetLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_RetLogin instance
         */
        public static create(properties?: msg.IGW2C_RetLogin): msg.GW2C_RetLogin;

        /**
         * Encodes the specified GW2C_RetLogin message. Does not implicitly {@link msg.GW2C_RetLogin.verify|verify} messages.
         * @param message GW2C_RetLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_RetLogin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_RetLogin message, length delimited. Does not implicitly {@link msg.GW2C_RetLogin.verify|verify} messages.
         * @param message GW2C_RetLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_RetLogin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_RetLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_RetLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_RetLogin;

        /**
         * Decodes a GW2C_RetLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_RetLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_RetLogin;

        /**
         * Verifies a GW2C_RetLogin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_RetLogin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_RetLogin
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_RetLogin;

        /**
         * Creates a plain object from a GW2C_RetLogin message. Also converts values to other types if specified.
         * @param message GW2C_RetLogin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_RetLogin, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_RetLogin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_PushUserInfo. */
    interface IGW2C_PushUserInfo {

        /** GW2C_PushUserInfo entity */
        entity?: (msg.IEntityBase|null);

        /** GW2C_PushUserInfo base */
        base?: (msg.IUserBase|null);

        /** GW2C_PushUserInfo item */
        item?: (msg.IItemBin|null);
    }

    /** Represents a GW2C_PushUserInfo. */
    class GW2C_PushUserInfo implements IGW2C_PushUserInfo {

        /**
         * Constructs a new GW2C_PushUserInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_PushUserInfo);

        /** GW2C_PushUserInfo entity. */
        public entity?: (msg.IEntityBase|null);

        /** GW2C_PushUserInfo base. */
        public base?: (msg.IUserBase|null);

        /** GW2C_PushUserInfo item. */
        public item?: (msg.IItemBin|null);

        /**
         * Creates a new GW2C_PushUserInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_PushUserInfo instance
         */
        public static create(properties?: msg.IGW2C_PushUserInfo): msg.GW2C_PushUserInfo;

        /**
         * Encodes the specified GW2C_PushUserInfo message. Does not implicitly {@link msg.GW2C_PushUserInfo.verify|verify} messages.
         * @param message GW2C_PushUserInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_PushUserInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_PushUserInfo message, length delimited. Does not implicitly {@link msg.GW2C_PushUserInfo.verify|verify} messages.
         * @param message GW2C_PushUserInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_PushUserInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_PushUserInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_PushUserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_PushUserInfo;

        /**
         * Decodes a GW2C_PushUserInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_PushUserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_PushUserInfo;

        /**
         * Verifies a GW2C_PushUserInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_PushUserInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_PushUserInfo
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_PushUserInfo;

        /**
         * Creates a plain object from a GW2C_PushUserInfo message. Also converts values to other types if specified.
         * @param message GW2C_PushUserInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_PushUserInfo, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_PushUserInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_HeartBeat. */
    interface IC2GW_HeartBeat {

        /** C2GW_HeartBeat uid */
        uid?: (number|Long|null);

        /** C2GW_HeartBeat time */
        time?: (number|Long|null);

        /** C2GW_HeartBeat test */
        test?: (string[]|null);
    }

    /** Represents a C2GW_HeartBeat. */
    class C2GW_HeartBeat implements IC2GW_HeartBeat {

        /**
         * Constructs a new C2GW_HeartBeat.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_HeartBeat);

        /** C2GW_HeartBeat uid. */
        public uid: (number|Long);

        /** C2GW_HeartBeat time. */
        public time: (number|Long);

        /** C2GW_HeartBeat test. */
        public test: string[];

        /**
         * Creates a new C2GW_HeartBeat instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_HeartBeat instance
         */
        public static create(properties?: msg.IC2GW_HeartBeat): msg.C2GW_HeartBeat;

        /**
         * Encodes the specified C2GW_HeartBeat message. Does not implicitly {@link msg.C2GW_HeartBeat.verify|verify} messages.
         * @param message C2GW_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_HeartBeat message, length delimited. Does not implicitly {@link msg.C2GW_HeartBeat.verify|verify} messages.
         * @param message C2GW_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_HeartBeat message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_HeartBeat;

        /**
         * Decodes a C2GW_HeartBeat message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_HeartBeat;

        /**
         * Verifies a C2GW_HeartBeat message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_HeartBeat message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_HeartBeat
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_HeartBeat;

        /**
         * Creates a plain object from a C2GW_HeartBeat message. Also converts values to other types if specified.
         * @param message C2GW_HeartBeat
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_HeartBeat, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_HeartBeat to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_HeartBeat. */
    interface IGW2C_HeartBeat {

        /** GW2C_HeartBeat uid */
        uid?: (number|Long|null);

        /** GW2C_HeartBeat time */
        time?: (number|Long|null);

        /** GW2C_HeartBeat test */
        test?: (string[]|null);
    }

    /** Represents a GW2C_HeartBeat. */
    class GW2C_HeartBeat implements IGW2C_HeartBeat {

        /**
         * Constructs a new GW2C_HeartBeat.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_HeartBeat);

        /** GW2C_HeartBeat uid. */
        public uid: (number|Long);

        /** GW2C_HeartBeat time. */
        public time: (number|Long);

        /** GW2C_HeartBeat test. */
        public test: string[];

        /**
         * Creates a new GW2C_HeartBeat instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_HeartBeat instance
         */
        public static create(properties?: msg.IGW2C_HeartBeat): msg.GW2C_HeartBeat;

        /**
         * Encodes the specified GW2C_HeartBeat message. Does not implicitly {@link msg.GW2C_HeartBeat.verify|verify} messages.
         * @param message GW2C_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_HeartBeat message, length delimited. Does not implicitly {@link msg.GW2C_HeartBeat.verify|verify} messages.
         * @param message GW2C_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_HeartBeat message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_HeartBeat;

        /**
         * Decodes a GW2C_HeartBeat message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_HeartBeat;

        /**
         * Verifies a GW2C_HeartBeat message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_HeartBeat message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_HeartBeat
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_HeartBeat;

        /**
         * Creates a plain object from a GW2C_HeartBeat message. Also converts values to other types if specified.
         * @param message GW2C_HeartBeat
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_HeartBeat, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_HeartBeat to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_ReqRechargeMoney. */
    interface IC2GW_ReqRechargeMoney {

        /** C2GW_ReqRechargeMoney amount */
        amount?: (number|null);

        /** C2GW_ReqRechargeMoney token */
        token?: (string|null);

        /** C2GW_ReqRechargeMoney type */
        type?: (number|null);
    }

    /** Represents a C2GW_ReqRechargeMoney. */
    class C2GW_ReqRechargeMoney implements IC2GW_ReqRechargeMoney {

        /**
         * Constructs a new C2GW_ReqRechargeMoney.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_ReqRechargeMoney);

        /** C2GW_ReqRechargeMoney amount. */
        public amount: number;

        /** C2GW_ReqRechargeMoney token. */
        public token: string;

        /** C2GW_ReqRechargeMoney type. */
        public type: number;

        /**
         * Creates a new C2GW_ReqRechargeMoney instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_ReqRechargeMoney instance
         */
        public static create(properties?: msg.IC2GW_ReqRechargeMoney): msg.C2GW_ReqRechargeMoney;

        /**
         * Encodes the specified C2GW_ReqRechargeMoney message. Does not implicitly {@link msg.C2GW_ReqRechargeMoney.verify|verify} messages.
         * @param message C2GW_ReqRechargeMoney message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_ReqRechargeMoney, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_ReqRechargeMoney message, length delimited. Does not implicitly {@link msg.C2GW_ReqRechargeMoney.verify|verify} messages.
         * @param message C2GW_ReqRechargeMoney message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_ReqRechargeMoney, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_ReqRechargeMoney message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_ReqRechargeMoney
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_ReqRechargeMoney;

        /**
         * Decodes a C2GW_ReqRechargeMoney message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_ReqRechargeMoney
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_ReqRechargeMoney;

        /**
         * Verifies a C2GW_ReqRechargeMoney message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_ReqRechargeMoney message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_ReqRechargeMoney
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_ReqRechargeMoney;

        /**
         * Creates a plain object from a C2GW_ReqRechargeMoney message. Also converts values to other types if specified.
         * @param message C2GW_ReqRechargeMoney
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_ReqRechargeMoney, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_ReqRechargeMoney to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_RetRechargeMoney. */
    interface IGW2C_RetRechargeMoney {

        /** GW2C_RetRechargeMoney urlcheckout */
        urlcheckout?: (string|null);
    }

    /** Represents a GW2C_RetRechargeMoney. */
    class GW2C_RetRechargeMoney implements IGW2C_RetRechargeMoney {

        /**
         * Constructs a new GW2C_RetRechargeMoney.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_RetRechargeMoney);

        /** GW2C_RetRechargeMoney urlcheckout. */
        public urlcheckout: string;

        /**
         * Creates a new GW2C_RetRechargeMoney instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_RetRechargeMoney instance
         */
        public static create(properties?: msg.IGW2C_RetRechargeMoney): msg.GW2C_RetRechargeMoney;

        /**
         * Encodes the specified GW2C_RetRechargeMoney message. Does not implicitly {@link msg.GW2C_RetRechargeMoney.verify|verify} messages.
         * @param message GW2C_RetRechargeMoney message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_RetRechargeMoney, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_RetRechargeMoney message, length delimited. Does not implicitly {@link msg.GW2C_RetRechargeMoney.verify|verify} messages.
         * @param message GW2C_RetRechargeMoney message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_RetRechargeMoney, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_RetRechargeMoney message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_RetRechargeMoney
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_RetRechargeMoney;

        /**
         * Decodes a GW2C_RetRechargeMoney message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_RetRechargeMoney
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_RetRechargeMoney;

        /**
         * Verifies a GW2C_RetRechargeMoney message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_RetRechargeMoney message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_RetRechargeMoney
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_RetRechargeMoney;

        /**
         * Creates a plain object from a GW2C_RetRechargeMoney message. Also converts values to other types if specified.
         * @param message GW2C_RetRechargeMoney
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_RetRechargeMoney, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_RetRechargeMoney to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_PlatformRechargeDone. */
    interface IC2GW_PlatformRechargeDone {

        /** C2GW_PlatformRechargeDone userid */
        userid?: (number|Long|null);
    }

    /** Represents a C2GW_PlatformRechargeDone. */
    class C2GW_PlatformRechargeDone implements IC2GW_PlatformRechargeDone {

        /**
         * Constructs a new C2GW_PlatformRechargeDone.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_PlatformRechargeDone);

        /** C2GW_PlatformRechargeDone userid. */
        public userid: (number|Long);

        /**
         * Creates a new C2GW_PlatformRechargeDone instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_PlatformRechargeDone instance
         */
        public static create(properties?: msg.IC2GW_PlatformRechargeDone): msg.C2GW_PlatformRechargeDone;

        /**
         * Encodes the specified C2GW_PlatformRechargeDone message. Does not implicitly {@link msg.C2GW_PlatformRechargeDone.verify|verify} messages.
         * @param message C2GW_PlatformRechargeDone message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_PlatformRechargeDone, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_PlatformRechargeDone message, length delimited. Does not implicitly {@link msg.C2GW_PlatformRechargeDone.verify|verify} messages.
         * @param message C2GW_PlatformRechargeDone message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_PlatformRechargeDone, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_PlatformRechargeDone message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_PlatformRechargeDone
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_PlatformRechargeDone;

        /**
         * Decodes a C2GW_PlatformRechargeDone message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_PlatformRechargeDone
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_PlatformRechargeDone;

        /**
         * Verifies a C2GW_PlatformRechargeDone message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_PlatformRechargeDone message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_PlatformRechargeDone
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_PlatformRechargeDone;

        /**
         * Creates a plain object from a C2GW_PlatformRechargeDone message. Also converts values to other types if specified.
         * @param message C2GW_PlatformRechargeDone
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_PlatformRechargeDone, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_PlatformRechargeDone to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_SendWechatInfo. */
    interface IGW2C_SendWechatInfo {

        /** GW2C_SendWechatInfo openid */
        openid?: (string|null);
    }

    /** Represents a GW2C_SendWechatInfo. */
    class GW2C_SendWechatInfo implements IGW2C_SendWechatInfo {

        /**
         * Constructs a new GW2C_SendWechatInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_SendWechatInfo);

        /** GW2C_SendWechatInfo openid. */
        public openid: string;

        /**
         * Creates a new GW2C_SendWechatInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_SendWechatInfo instance
         */
        public static create(properties?: msg.IGW2C_SendWechatInfo): msg.GW2C_SendWechatInfo;

        /**
         * Encodes the specified GW2C_SendWechatInfo message. Does not implicitly {@link msg.GW2C_SendWechatInfo.verify|verify} messages.
         * @param message GW2C_SendWechatInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_SendWechatInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_SendWechatInfo message, length delimited. Does not implicitly {@link msg.GW2C_SendWechatInfo.verify|verify} messages.
         * @param message GW2C_SendWechatInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_SendWechatInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_SendWechatInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_SendWechatInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_SendWechatInfo;

        /**
         * Decodes a GW2C_SendWechatInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_SendWechatInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_SendWechatInfo;

        /**
         * Verifies a GW2C_SendWechatInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_SendWechatInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_SendWechatInfo
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_SendWechatInfo;

        /**
         * Creates a plain object from a GW2C_SendWechatInfo message. Also converts values to other types if specified.
         * @param message GW2C_SendWechatInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_SendWechatInfo, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_SendWechatInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_StartLuckyDraw. */
    interface IC2GW_StartLuckyDraw {

        /** C2GW_StartLuckyDraw userid */
        userid?: (number|Long|null);
    }

    /** Represents a C2GW_StartLuckyDraw. */
    class C2GW_StartLuckyDraw implements IC2GW_StartLuckyDraw {

        /**
         * Constructs a new C2GW_StartLuckyDraw.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_StartLuckyDraw);

        /** C2GW_StartLuckyDraw userid. */
        public userid: (number|Long);

        /**
         * Creates a new C2GW_StartLuckyDraw instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_StartLuckyDraw instance
         */
        public static create(properties?: msg.IC2GW_StartLuckyDraw): msg.C2GW_StartLuckyDraw;

        /**
         * Encodes the specified C2GW_StartLuckyDraw message. Does not implicitly {@link msg.C2GW_StartLuckyDraw.verify|verify} messages.
         * @param message C2GW_StartLuckyDraw message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_StartLuckyDraw, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_StartLuckyDraw message, length delimited. Does not implicitly {@link msg.C2GW_StartLuckyDraw.verify|verify} messages.
         * @param message C2GW_StartLuckyDraw message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_StartLuckyDraw, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_StartLuckyDraw message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_StartLuckyDraw
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_StartLuckyDraw;

        /**
         * Decodes a C2GW_StartLuckyDraw message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_StartLuckyDraw
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_StartLuckyDraw;

        /**
         * Verifies a C2GW_StartLuckyDraw message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_StartLuckyDraw message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_StartLuckyDraw
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_StartLuckyDraw;

        /**
         * Creates a plain object from a C2GW_StartLuckyDraw message. Also converts values to other types if specified.
         * @param message C2GW_StartLuckyDraw
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_StartLuckyDraw, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_StartLuckyDraw to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_LuckyDrawHit. */
    interface IGW2C_LuckyDrawHit {

        /** GW2C_LuckyDrawHit id */
        id?: (number|null);
    }

    /** Represents a GW2C_LuckyDrawHit. */
    class GW2C_LuckyDrawHit implements IGW2C_LuckyDrawHit {

        /**
         * Constructs a new GW2C_LuckyDrawHit.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_LuckyDrawHit);

        /** GW2C_LuckyDrawHit id. */
        public id: number;

        /**
         * Creates a new GW2C_LuckyDrawHit instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_LuckyDrawHit instance
         */
        public static create(properties?: msg.IGW2C_LuckyDrawHit): msg.GW2C_LuckyDrawHit;

        /**
         * Encodes the specified GW2C_LuckyDrawHit message. Does not implicitly {@link msg.GW2C_LuckyDrawHit.verify|verify} messages.
         * @param message GW2C_LuckyDrawHit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_LuckyDrawHit, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_LuckyDrawHit message, length delimited. Does not implicitly {@link msg.GW2C_LuckyDrawHit.verify|verify} messages.
         * @param message GW2C_LuckyDrawHit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_LuckyDrawHit, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_LuckyDrawHit message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_LuckyDrawHit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_LuckyDrawHit;

        /**
         * Decodes a GW2C_LuckyDrawHit message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_LuckyDrawHit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_LuckyDrawHit;

        /**
         * Verifies a GW2C_LuckyDrawHit message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_LuckyDrawHit message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_LuckyDrawHit
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_LuckyDrawHit;

        /**
         * Creates a plain object from a GW2C_LuckyDrawHit message. Also converts values to other types if specified.
         * @param message GW2C_LuckyDrawHit
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_LuckyDrawHit, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_LuckyDrawHit to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_SendTaskList. */
    interface IGW2C_SendTaskList {

        /** GW2C_SendTaskList tasks */
        tasks?: (msg.ITaskData[]|null);
    }

    /** Represents a GW2C_SendTaskList. */
    class GW2C_SendTaskList implements IGW2C_SendTaskList {

        /**
         * Constructs a new GW2C_SendTaskList.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_SendTaskList);

        /** GW2C_SendTaskList tasks. */
        public tasks: msg.ITaskData[];

        /**
         * Creates a new GW2C_SendTaskList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_SendTaskList instance
         */
        public static create(properties?: msg.IGW2C_SendTaskList): msg.GW2C_SendTaskList;

        /**
         * Encodes the specified GW2C_SendTaskList message. Does not implicitly {@link msg.GW2C_SendTaskList.verify|verify} messages.
         * @param message GW2C_SendTaskList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_SendTaskList, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_SendTaskList message, length delimited. Does not implicitly {@link msg.GW2C_SendTaskList.verify|verify} messages.
         * @param message GW2C_SendTaskList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_SendTaskList, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_SendTaskList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_SendTaskList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_SendTaskList;

        /**
         * Decodes a GW2C_SendTaskList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_SendTaskList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_SendTaskList;

        /**
         * Verifies a GW2C_SendTaskList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_SendTaskList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_SendTaskList
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_SendTaskList;

        /**
         * Creates a plain object from a GW2C_SendTaskList message. Also converts values to other types if specified.
         * @param message GW2C_SendTaskList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_SendTaskList, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_SendTaskList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_SendLuckyDrawRecord. */
    interface IGW2C_SendLuckyDrawRecord {

        /** GW2C_SendLuckyDrawRecord luckydraw */
        luckydraw?: (msg.ILuckyDrawRecord|null);
    }

    /** Represents a GW2C_SendLuckyDrawRecord. */
    class GW2C_SendLuckyDrawRecord implements IGW2C_SendLuckyDrawRecord {

        /**
         * Constructs a new GW2C_SendLuckyDrawRecord.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_SendLuckyDrawRecord);

        /** GW2C_SendLuckyDrawRecord luckydraw. */
        public luckydraw?: (msg.ILuckyDrawRecord|null);

        /**
         * Creates a new GW2C_SendLuckyDrawRecord instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_SendLuckyDrawRecord instance
         */
        public static create(properties?: msg.IGW2C_SendLuckyDrawRecord): msg.GW2C_SendLuckyDrawRecord;

        /**
         * Encodes the specified GW2C_SendLuckyDrawRecord message. Does not implicitly {@link msg.GW2C_SendLuckyDrawRecord.verify|verify} messages.
         * @param message GW2C_SendLuckyDrawRecord message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_SendLuckyDrawRecord, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_SendLuckyDrawRecord message, length delimited. Does not implicitly {@link msg.GW2C_SendLuckyDrawRecord.verify|verify} messages.
         * @param message GW2C_SendLuckyDrawRecord message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_SendLuckyDrawRecord, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_SendLuckyDrawRecord message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_SendLuckyDrawRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_SendLuckyDrawRecord;

        /**
         * Decodes a GW2C_SendLuckyDrawRecord message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_SendLuckyDrawRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_SendLuckyDrawRecord;

        /**
         * Verifies a GW2C_SendLuckyDrawRecord message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_SendLuckyDrawRecord message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_SendLuckyDrawRecord
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_SendLuckyDrawRecord;

        /**
         * Creates a plain object from a GW2C_SendLuckyDrawRecord message. Also converts values to other types if specified.
         * @param message GW2C_SendLuckyDrawRecord
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_SendLuckyDrawRecord, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_SendLuckyDrawRecord to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_ReqTaskList. */
    interface IC2GW_ReqTaskList {
    }

    /** Represents a C2GW_ReqTaskList. */
    class C2GW_ReqTaskList implements IC2GW_ReqTaskList {

        /**
         * Constructs a new C2GW_ReqTaskList.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_ReqTaskList);

        /**
         * Creates a new C2GW_ReqTaskList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_ReqTaskList instance
         */
        public static create(properties?: msg.IC2GW_ReqTaskList): msg.C2GW_ReqTaskList;

        /**
         * Encodes the specified C2GW_ReqTaskList message. Does not implicitly {@link msg.C2GW_ReqTaskList.verify|verify} messages.
         * @param message C2GW_ReqTaskList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_ReqTaskList, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_ReqTaskList message, length delimited. Does not implicitly {@link msg.C2GW_ReqTaskList.verify|verify} messages.
         * @param message C2GW_ReqTaskList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_ReqTaskList, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_ReqTaskList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_ReqTaskList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_ReqTaskList;

        /**
         * Decodes a C2GW_ReqTaskList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_ReqTaskList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_ReqTaskList;

        /**
         * Verifies a C2GW_ReqTaskList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_ReqTaskList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_ReqTaskList
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_ReqTaskList;

        /**
         * Creates a plain object from a C2GW_ReqTaskList message. Also converts values to other types if specified.
         * @param message C2GW_ReqTaskList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_ReqTaskList, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_ReqTaskList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_Ret7DayReward. */
    interface IGW2C_Ret7DayReward {

        /** GW2C_Ret7DayReward day */
        day?: (number|null);
    }

    /** Represents a GW2C_Ret7DayReward. */
    class GW2C_Ret7DayReward implements IGW2C_Ret7DayReward {

        /**
         * Constructs a new GW2C_Ret7DayReward.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_Ret7DayReward);

        /** GW2C_Ret7DayReward day. */
        public day: number;

        /**
         * Creates a new GW2C_Ret7DayReward instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_Ret7DayReward instance
         */
        public static create(properties?: msg.IGW2C_Ret7DayReward): msg.GW2C_Ret7DayReward;

        /**
         * Encodes the specified GW2C_Ret7DayReward message. Does not implicitly {@link msg.GW2C_Ret7DayReward.verify|verify} messages.
         * @param message GW2C_Ret7DayReward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_Ret7DayReward, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_Ret7DayReward message, length delimited. Does not implicitly {@link msg.GW2C_Ret7DayReward.verify|verify} messages.
         * @param message GW2C_Ret7DayReward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_Ret7DayReward, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_Ret7DayReward message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_Ret7DayReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_Ret7DayReward;

        /**
         * Decodes a GW2C_Ret7DayReward message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_Ret7DayReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_Ret7DayReward;

        /**
         * Verifies a GW2C_Ret7DayReward message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_Ret7DayReward message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_Ret7DayReward
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_Ret7DayReward;

        /**
         * Creates a plain object from a GW2C_Ret7DayReward message. Also converts values to other types if specified.
         * @param message GW2C_Ret7DayReward
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_Ret7DayReward, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_Ret7DayReward to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_Get7DayReward. */
    interface IC2GW_Get7DayReward {
    }

    /** Represents a C2GW_Get7DayReward. */
    class C2GW_Get7DayReward implements IC2GW_Get7DayReward {

        /**
         * Constructs a new C2GW_Get7DayReward.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_Get7DayReward);

        /**
         * Creates a new C2GW_Get7DayReward instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_Get7DayReward instance
         */
        public static create(properties?: msg.IC2GW_Get7DayReward): msg.C2GW_Get7DayReward;

        /**
         * Encodes the specified C2GW_Get7DayReward message. Does not implicitly {@link msg.C2GW_Get7DayReward.verify|verify} messages.
         * @param message C2GW_Get7DayReward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_Get7DayReward, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_Get7DayReward message, length delimited. Does not implicitly {@link msg.C2GW_Get7DayReward.verify|verify} messages.
         * @param message C2GW_Get7DayReward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_Get7DayReward, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_Get7DayReward message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_Get7DayReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_Get7DayReward;

        /**
         * Decodes a C2GW_Get7DayReward message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_Get7DayReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_Get7DayReward;

        /**
         * Verifies a C2GW_Get7DayReward message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_Get7DayReward message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_Get7DayReward
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_Get7DayReward;

        /**
         * Creates a plain object from a C2GW_Get7DayReward message. Also converts values to other types if specified.
         * @param message C2GW_Get7DayReward
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_Get7DayReward, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_Get7DayReward to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_SendWechatAuthCode. */
    interface IC2GW_SendWechatAuthCode {

        /** C2GW_SendWechatAuthCode code */
        code?: (string|null);
    }

    /** Represents a C2GW_SendWechatAuthCode. */
    class C2GW_SendWechatAuthCode implements IC2GW_SendWechatAuthCode {

        /**
         * Constructs a new C2GW_SendWechatAuthCode.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_SendWechatAuthCode);

        /** C2GW_SendWechatAuthCode code. */
        public code: string;

        /**
         * Creates a new C2GW_SendWechatAuthCode instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_SendWechatAuthCode instance
         */
        public static create(properties?: msg.IC2GW_SendWechatAuthCode): msg.C2GW_SendWechatAuthCode;

        /**
         * Encodes the specified C2GW_SendWechatAuthCode message. Does not implicitly {@link msg.C2GW_SendWechatAuthCode.verify|verify} messages.
         * @param message C2GW_SendWechatAuthCode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_SendWechatAuthCode, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_SendWechatAuthCode message, length delimited. Does not implicitly {@link msg.C2GW_SendWechatAuthCode.verify|verify} messages.
         * @param message C2GW_SendWechatAuthCode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_SendWechatAuthCode, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_SendWechatAuthCode message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_SendWechatAuthCode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_SendWechatAuthCode;

        /**
         * Decodes a C2GW_SendWechatAuthCode message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_SendWechatAuthCode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_SendWechatAuthCode;

        /**
         * Verifies a C2GW_SendWechatAuthCode message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_SendWechatAuthCode message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_SendWechatAuthCode
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_SendWechatAuthCode;

        /**
         * Creates a plain object from a C2GW_SendWechatAuthCode message. Also converts values to other types if specified.
         * @param message C2GW_SendWechatAuthCode
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_SendWechatAuthCode, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_SendWechatAuthCode to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_MsgNotify. */
    interface IGW2C_MsgNotify {

        /** GW2C_MsgNotify userid */
        userid?: (number|Long|null);

        /** GW2C_MsgNotify text */
        text?: (string|null);
    }

    /** Represents a GW2C_MsgNotify. */
    class GW2C_MsgNotify implements IGW2C_MsgNotify {

        /**
         * Constructs a new GW2C_MsgNotify.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_MsgNotify);

        /** GW2C_MsgNotify userid. */
        public userid: (number|Long);

        /** GW2C_MsgNotify text. */
        public text: string;

        /**
         * Creates a new GW2C_MsgNotify instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_MsgNotify instance
         */
        public static create(properties?: msg.IGW2C_MsgNotify): msg.GW2C_MsgNotify;

        /**
         * Encodes the specified GW2C_MsgNotify message. Does not implicitly {@link msg.GW2C_MsgNotify.verify|verify} messages.
         * @param message GW2C_MsgNotify message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_MsgNotify, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_MsgNotify message, length delimited. Does not implicitly {@link msg.GW2C_MsgNotify.verify|verify} messages.
         * @param message GW2C_MsgNotify message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_MsgNotify, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_MsgNotify message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_MsgNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_MsgNotify;

        /**
         * Decodes a GW2C_MsgNotify message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_MsgNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_MsgNotify;

        /**
         * Verifies a GW2C_MsgNotify message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_MsgNotify message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_MsgNotify
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_MsgNotify;

        /**
         * Creates a plain object from a GW2C_MsgNotify message. Also converts values to other types if specified.
         * @param message GW2C_MsgNotify
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_MsgNotify, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_MsgNotify to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** NoticeType enum. */
    enum NoticeType {
        Suspension = 1,
        Marquee = 2
    }

    /** Properties of a GW2C_MsgNotice. */
    interface IGW2C_MsgNotice {

        /** GW2C_MsgNotice userid */
        userid?: (number|Long|null);

        /** GW2C_MsgNotice head */
        head?: (string|null);

        /** GW2C_MsgNotice name */
        name?: (string|null);

        /** GW2C_MsgNotice type */
        type?: (number|null);

        /** GW2C_MsgNotice text */
        text?: (string|null);
    }

    /** Represents a GW2C_MsgNotice. */
    class GW2C_MsgNotice implements IGW2C_MsgNotice {

        /**
         * Constructs a new GW2C_MsgNotice.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_MsgNotice);

        /** GW2C_MsgNotice userid. */
        public userid: (number|Long);

        /** GW2C_MsgNotice head. */
        public head: string;

        /** GW2C_MsgNotice name. */
        public name: string;

        /** GW2C_MsgNotice type. */
        public type: number;

        /** GW2C_MsgNotice text. */
        public text: string;

        /**
         * Creates a new GW2C_MsgNotice instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_MsgNotice instance
         */
        public static create(properties?: msg.IGW2C_MsgNotice): msg.GW2C_MsgNotice;

        /**
         * Encodes the specified GW2C_MsgNotice message. Does not implicitly {@link msg.GW2C_MsgNotice.verify|verify} messages.
         * @param message GW2C_MsgNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_MsgNotice, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_MsgNotice message, length delimited. Does not implicitly {@link msg.GW2C_MsgNotice.verify|verify} messages.
         * @param message GW2C_MsgNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_MsgNotice, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_MsgNotice message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_MsgNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_MsgNotice;

        /**
         * Decodes a GW2C_MsgNotice message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_MsgNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_MsgNotice;

        /**
         * Verifies a GW2C_MsgNotice message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_MsgNotice message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_MsgNotice
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_MsgNotice;

        /**
         * Creates a plain object from a GW2C_MsgNotice message. Also converts values to other types if specified.
         * @param message GW2C_MsgNotice
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_MsgNotice, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_MsgNotice to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2MS_MsgNotice. */
    interface IGW2MS_MsgNotice {

        /** GW2MS_MsgNotice notice */
        notice?: (msg.IGW2C_MsgNotice|null);
    }

    /** Represents a GW2MS_MsgNotice. */
    class GW2MS_MsgNotice implements IGW2MS_MsgNotice {

        /**
         * Constructs a new GW2MS_MsgNotice.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2MS_MsgNotice);

        /** GW2MS_MsgNotice notice. */
        public notice?: (msg.IGW2C_MsgNotice|null);

        /**
         * Creates a new GW2MS_MsgNotice instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2MS_MsgNotice instance
         */
        public static create(properties?: msg.IGW2MS_MsgNotice): msg.GW2MS_MsgNotice;

        /**
         * Encodes the specified GW2MS_MsgNotice message. Does not implicitly {@link msg.GW2MS_MsgNotice.verify|verify} messages.
         * @param message GW2MS_MsgNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2MS_MsgNotice, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2MS_MsgNotice message, length delimited. Does not implicitly {@link msg.GW2MS_MsgNotice.verify|verify} messages.
         * @param message GW2MS_MsgNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2MS_MsgNotice, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2MS_MsgNotice message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2MS_MsgNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2MS_MsgNotice;

        /**
         * Decodes a GW2MS_MsgNotice message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2MS_MsgNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2MS_MsgNotice;

        /**
         * Verifies a GW2MS_MsgNotice message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2MS_MsgNotice message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2MS_MsgNotice
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2MS_MsgNotice;

        /**
         * Creates a plain object from a GW2MS_MsgNotice message. Also converts values to other types if specified.
         * @param message GW2MS_MsgNotice
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2MS_MsgNotice, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2MS_MsgNotice to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RS2MS_MsgNotice. */
    interface IRS2MS_MsgNotice {

        /** RS2MS_MsgNotice notice */
        notice?: (msg.IGW2C_MsgNotice|null);
    }

    /** Represents a RS2MS_MsgNotice. */
    class RS2MS_MsgNotice implements IRS2MS_MsgNotice {

        /**
         * Constructs a new RS2MS_MsgNotice.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRS2MS_MsgNotice);

        /** RS2MS_MsgNotice notice. */
        public notice?: (msg.IGW2C_MsgNotice|null);

        /**
         * Creates a new RS2MS_MsgNotice instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RS2MS_MsgNotice instance
         */
        public static create(properties?: msg.IRS2MS_MsgNotice): msg.RS2MS_MsgNotice;

        /**
         * Encodes the specified RS2MS_MsgNotice message. Does not implicitly {@link msg.RS2MS_MsgNotice.verify|verify} messages.
         * @param message RS2MS_MsgNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRS2MS_MsgNotice, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified RS2MS_MsgNotice message, length delimited. Does not implicitly {@link msg.RS2MS_MsgNotice.verify|verify} messages.
         * @param message RS2MS_MsgNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRS2MS_MsgNotice, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a RS2MS_MsgNotice message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RS2MS_MsgNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.RS2MS_MsgNotice;

        /**
         * Decodes a RS2MS_MsgNotice message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RS2MS_MsgNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.RS2MS_MsgNotice;

        /**
         * Verifies a RS2MS_MsgNotice message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RS2MS_MsgNotice message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RS2MS_MsgNotice
         */
        public static fromObject(object: { [k: string]: any }): msg.RS2MS_MsgNotice;

        /**
         * Creates a plain object from a RS2MS_MsgNotice message. Also converts values to other types if specified.
         * @param message RS2MS_MsgNotice
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RS2MS_MsgNotice, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RS2MS_MsgNotice to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MS2GW_MsgNotice. */
    interface IMS2GW_MsgNotice {

        /** MS2GW_MsgNotice notice */
        notice?: (msg.IGW2C_MsgNotice|null);
    }

    /** Represents a MS2GW_MsgNotice. */
    class MS2GW_MsgNotice implements IMS2GW_MsgNotice {

        /**
         * Constructs a new MS2GW_MsgNotice.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IMS2GW_MsgNotice);

        /** MS2GW_MsgNotice notice. */
        public notice?: (msg.IGW2C_MsgNotice|null);

        /**
         * Creates a new MS2GW_MsgNotice instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MS2GW_MsgNotice instance
         */
        public static create(properties?: msg.IMS2GW_MsgNotice): msg.MS2GW_MsgNotice;

        /**
         * Encodes the specified MS2GW_MsgNotice message. Does not implicitly {@link msg.MS2GW_MsgNotice.verify|verify} messages.
         * @param message MS2GW_MsgNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IMS2GW_MsgNotice, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified MS2GW_MsgNotice message, length delimited. Does not implicitly {@link msg.MS2GW_MsgNotice.verify|verify} messages.
         * @param message MS2GW_MsgNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IMS2GW_MsgNotice, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a MS2GW_MsgNotice message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MS2GW_MsgNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.MS2GW_MsgNotice;

        /**
         * Decodes a MS2GW_MsgNotice message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MS2GW_MsgNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.MS2GW_MsgNotice;

        /**
         * Verifies a MS2GW_MsgNotice message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MS2GW_MsgNotice message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MS2GW_MsgNotice
         */
        public static fromObject(object: { [k: string]: any }): msg.MS2GW_MsgNotice;

        /**
         * Creates a plain object from a MS2GW_MsgNotice message. Also converts values to other types if specified.
         * @param message MS2GW_MsgNotice
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.MS2GW_MsgNotice, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MS2GW_MsgNotice to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TanTanLeRoom. */
    interface ITanTanLeRoom {

        /** TanTanLeRoom tid */
        tid?: (number|null);
    }

    /** Represents a TanTanLeRoom. */
    class TanTanLeRoom implements ITanTanLeRoom {

        /**
         * Constructs a new TanTanLeRoom.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ITanTanLeRoom);

        /** TanTanLeRoom tid. */
        public tid: number;

        /**
         * Creates a new TanTanLeRoom instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TanTanLeRoom instance
         */
        public static create(properties?: msg.ITanTanLeRoom): msg.TanTanLeRoom;

        /**
         * Encodes the specified TanTanLeRoom message. Does not implicitly {@link msg.TanTanLeRoom.verify|verify} messages.
         * @param message TanTanLeRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ITanTanLeRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TanTanLeRoom message, length delimited. Does not implicitly {@link msg.TanTanLeRoom.verify|verify} messages.
         * @param message TanTanLeRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ITanTanLeRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TanTanLeRoom message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TanTanLeRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.TanTanLeRoom;

        /**
         * Decodes a TanTanLeRoom message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TanTanLeRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.TanTanLeRoom;

        /**
         * Verifies a TanTanLeRoom message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TanTanLeRoom message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TanTanLeRoom
         */
        public static fromObject(object: { [k: string]: any }): msg.TanTanLeRoom;

        /**
         * Creates a plain object from a TanTanLeRoom message. Also converts values to other types if specified.
         * @param message TanTanLeRoom
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.TanTanLeRoom, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TanTanLeRoom to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_ReqCreateRoom. */
    interface IC2GW_ReqCreateRoom {

        /** C2GW_ReqCreateRoom gamekind */
        gamekind?: (number|null);

        /** C2GW_ReqCreateRoom tantanle */
        tantanle?: (msg.ITanTanLeRoom|null);

        /** C2GW_ReqCreateRoom texas */
        texas?: (msg.ITexasPersonalRoom|null);
    }

    /** Represents a C2GW_ReqCreateRoom. */
    class C2GW_ReqCreateRoom implements IC2GW_ReqCreateRoom {

        /**
         * Constructs a new C2GW_ReqCreateRoom.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_ReqCreateRoom);

        /** C2GW_ReqCreateRoom gamekind. */
        public gamekind: number;

        /** C2GW_ReqCreateRoom tantanle. */
        public tantanle?: (msg.ITanTanLeRoom|null);

        /** C2GW_ReqCreateRoom texas. */
        public texas?: (msg.ITexasPersonalRoom|null);

        /**
         * Creates a new C2GW_ReqCreateRoom instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_ReqCreateRoom instance
         */
        public static create(properties?: msg.IC2GW_ReqCreateRoom): msg.C2GW_ReqCreateRoom;

        /**
         * Encodes the specified C2GW_ReqCreateRoom message. Does not implicitly {@link msg.C2GW_ReqCreateRoom.verify|verify} messages.
         * @param message C2GW_ReqCreateRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_ReqCreateRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_ReqCreateRoom message, length delimited. Does not implicitly {@link msg.C2GW_ReqCreateRoom.verify|verify} messages.
         * @param message C2GW_ReqCreateRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_ReqCreateRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_ReqCreateRoom message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_ReqCreateRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_ReqCreateRoom;

        /**
         * Decodes a C2GW_ReqCreateRoom message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_ReqCreateRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_ReqCreateRoom;

        /**
         * Verifies a C2GW_ReqCreateRoom message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_ReqCreateRoom message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_ReqCreateRoom
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_ReqCreateRoom;

        /**
         * Creates a plain object from a C2GW_ReqCreateRoom message. Also converts values to other types if specified.
         * @param message C2GW_ReqCreateRoom
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_ReqCreateRoom, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_ReqCreateRoom to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_RetCreateRoom. */
    interface IGW2C_RetCreateRoom {

        /** GW2C_RetCreateRoom errcode */
        errcode?: (string|null);

        /** GW2C_RetCreateRoom roomid */
        roomid?: (number|Long|null);

        /** GW2C_RetCreateRoom passwd */
        passwd?: (string|null);
    }

    /** Represents a GW2C_RetCreateRoom. */
    class GW2C_RetCreateRoom implements IGW2C_RetCreateRoom {

        /**
         * Constructs a new GW2C_RetCreateRoom.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_RetCreateRoom);

        /** GW2C_RetCreateRoom errcode. */
        public errcode: string;

        /** GW2C_RetCreateRoom roomid. */
        public roomid: (number|Long);

        /** GW2C_RetCreateRoom passwd. */
        public passwd: string;

        /**
         * Creates a new GW2C_RetCreateRoom instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_RetCreateRoom instance
         */
        public static create(properties?: msg.IGW2C_RetCreateRoom): msg.GW2C_RetCreateRoom;

        /**
         * Encodes the specified GW2C_RetCreateRoom message. Does not implicitly {@link msg.GW2C_RetCreateRoom.verify|verify} messages.
         * @param message GW2C_RetCreateRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_RetCreateRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_RetCreateRoom message, length delimited. Does not implicitly {@link msg.GW2C_RetCreateRoom.verify|verify} messages.
         * @param message GW2C_RetCreateRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_RetCreateRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_RetCreateRoom message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_RetCreateRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_RetCreateRoom;

        /**
         * Decodes a GW2C_RetCreateRoom message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_RetCreateRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_RetCreateRoom;

        /**
         * Verifies a GW2C_RetCreateRoom message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_RetCreateRoom message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_RetCreateRoom
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_RetCreateRoom;

        /**
         * Creates a plain object from a GW2C_RetCreateRoom message. Also converts values to other types if specified.
         * @param message GW2C_RetCreateRoom
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_RetCreateRoom, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_RetCreateRoom to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2MS_ReqCreateRoom. */
    interface IGW2MS_ReqCreateRoom {

        /** GW2MS_ReqCreateRoom userid */
        userid?: (number|Long|null);

        /** GW2MS_ReqCreateRoom gamekind */
        gamekind?: (number|null);

        /** GW2MS_ReqCreateRoom texas */
        texas?: (msg.ITexasPersonalRoom|null);
    }

    /** Represents a GW2MS_ReqCreateRoom. */
    class GW2MS_ReqCreateRoom implements IGW2MS_ReqCreateRoom {

        /**
         * Constructs a new GW2MS_ReqCreateRoom.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2MS_ReqCreateRoom);

        /** GW2MS_ReqCreateRoom userid. */
        public userid: (number|Long);

        /** GW2MS_ReqCreateRoom gamekind. */
        public gamekind: number;

        /** GW2MS_ReqCreateRoom texas. */
        public texas?: (msg.ITexasPersonalRoom|null);

        /**
         * Creates a new GW2MS_ReqCreateRoom instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2MS_ReqCreateRoom instance
         */
        public static create(properties?: msg.IGW2MS_ReqCreateRoom): msg.GW2MS_ReqCreateRoom;

        /**
         * Encodes the specified GW2MS_ReqCreateRoom message. Does not implicitly {@link msg.GW2MS_ReqCreateRoom.verify|verify} messages.
         * @param message GW2MS_ReqCreateRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2MS_ReqCreateRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2MS_ReqCreateRoom message, length delimited. Does not implicitly {@link msg.GW2MS_ReqCreateRoom.verify|verify} messages.
         * @param message GW2MS_ReqCreateRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2MS_ReqCreateRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2MS_ReqCreateRoom message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2MS_ReqCreateRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2MS_ReqCreateRoom;

        /**
         * Decodes a GW2MS_ReqCreateRoom message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2MS_ReqCreateRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2MS_ReqCreateRoom;

        /**
         * Verifies a GW2MS_ReqCreateRoom message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2MS_ReqCreateRoom message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2MS_ReqCreateRoom
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2MS_ReqCreateRoom;

        /**
         * Creates a plain object from a GW2MS_ReqCreateRoom message. Also converts values to other types if specified.
         * @param message GW2MS_ReqCreateRoom
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2MS_ReqCreateRoom, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2MS_ReqCreateRoom to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MS2GW_RetCreateRoom. */
    interface IMS2GW_RetCreateRoom {

        /** MS2GW_RetCreateRoom userid */
        userid?: (number|Long|null);

        /** MS2GW_RetCreateRoom roomid */
        roomid?: (number|Long|null);

        /** MS2GW_RetCreateRoom errcode */
        errcode?: (string|null);

        /** MS2GW_RetCreateRoom roomagent */
        roomagent?: (string|null);
    }

    /** Represents a MS2GW_RetCreateRoom. */
    class MS2GW_RetCreateRoom implements IMS2GW_RetCreateRoom {

        /**
         * Constructs a new MS2GW_RetCreateRoom.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IMS2GW_RetCreateRoom);

        /** MS2GW_RetCreateRoom userid. */
        public userid: (number|Long);

        /** MS2GW_RetCreateRoom roomid. */
        public roomid: (number|Long);

        /** MS2GW_RetCreateRoom errcode. */
        public errcode: string;

        /** MS2GW_RetCreateRoom roomagent. */
        public roomagent: string;

        /**
         * Creates a new MS2GW_RetCreateRoom instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MS2GW_RetCreateRoom instance
         */
        public static create(properties?: msg.IMS2GW_RetCreateRoom): msg.MS2GW_RetCreateRoom;

        /**
         * Encodes the specified MS2GW_RetCreateRoom message. Does not implicitly {@link msg.MS2GW_RetCreateRoom.verify|verify} messages.
         * @param message MS2GW_RetCreateRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IMS2GW_RetCreateRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified MS2GW_RetCreateRoom message, length delimited. Does not implicitly {@link msg.MS2GW_RetCreateRoom.verify|verify} messages.
         * @param message MS2GW_RetCreateRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IMS2GW_RetCreateRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a MS2GW_RetCreateRoom message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MS2GW_RetCreateRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.MS2GW_RetCreateRoom;

        /**
         * Decodes a MS2GW_RetCreateRoom message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MS2GW_RetCreateRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.MS2GW_RetCreateRoom;

        /**
         * Verifies a MS2GW_RetCreateRoom message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MS2GW_RetCreateRoom message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MS2GW_RetCreateRoom
         */
        public static fromObject(object: { [k: string]: any }): msg.MS2GW_RetCreateRoom;

        /**
         * Creates a plain object from a MS2GW_RetCreateRoom message. Also converts values to other types if specified.
         * @param message MS2GW_RetCreateRoom
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.MS2GW_RetCreateRoom, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MS2GW_RetCreateRoom to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MS2RS_CreateRoom. */
    interface IMS2RS_CreateRoom {

        /** MS2RS_CreateRoom userid */
        userid?: (number|Long|null);

        /** MS2RS_CreateRoom roomid */
        roomid?: (number|Long|null);

        /** MS2RS_CreateRoom gamekind */
        gamekind?: (number|null);

        /** MS2RS_CreateRoom sidgate */
        sidgate?: (number|null);

        /** MS2RS_CreateRoom texas */
        texas?: (msg.ITexasPersonalRoom|null);
    }

    /** Represents a MS2RS_CreateRoom. */
    class MS2RS_CreateRoom implements IMS2RS_CreateRoom {

        /**
         * Constructs a new MS2RS_CreateRoom.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IMS2RS_CreateRoom);

        /** MS2RS_CreateRoom userid. */
        public userid: (number|Long);

        /** MS2RS_CreateRoom roomid. */
        public roomid: (number|Long);

        /** MS2RS_CreateRoom gamekind. */
        public gamekind: number;

        /** MS2RS_CreateRoom sidgate. */
        public sidgate: number;

        /** MS2RS_CreateRoom texas. */
        public texas?: (msg.ITexasPersonalRoom|null);

        /**
         * Creates a new MS2RS_CreateRoom instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MS2RS_CreateRoom instance
         */
        public static create(properties?: msg.IMS2RS_CreateRoom): msg.MS2RS_CreateRoom;

        /**
         * Encodes the specified MS2RS_CreateRoom message. Does not implicitly {@link msg.MS2RS_CreateRoom.verify|verify} messages.
         * @param message MS2RS_CreateRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IMS2RS_CreateRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified MS2RS_CreateRoom message, length delimited. Does not implicitly {@link msg.MS2RS_CreateRoom.verify|verify} messages.
         * @param message MS2RS_CreateRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IMS2RS_CreateRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a MS2RS_CreateRoom message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MS2RS_CreateRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.MS2RS_CreateRoom;

        /**
         * Decodes a MS2RS_CreateRoom message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MS2RS_CreateRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.MS2RS_CreateRoom;

        /**
         * Verifies a MS2RS_CreateRoom message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MS2RS_CreateRoom message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MS2RS_CreateRoom
         */
        public static fromObject(object: { [k: string]: any }): msg.MS2RS_CreateRoom;

        /**
         * Creates a plain object from a MS2RS_CreateRoom message. Also converts values to other types if specified.
         * @param message MS2RS_CreateRoom
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.MS2RS_CreateRoom, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MS2RS_CreateRoom to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RS2MS_RetCreateRoom. */
    interface IRS2MS_RetCreateRoom {

        /** RS2MS_RetCreateRoom roomid */
        roomid?: (number|Long|null);

        /** RS2MS_RetCreateRoom userid */
        userid?: (number|Long|null);

        /** RS2MS_RetCreateRoom sidgate */
        sidgate?: (number|null);

        /** RS2MS_RetCreateRoom errcode */
        errcode?: (string|null);
    }

    /** Represents a RS2MS_RetCreateRoom. */
    class RS2MS_RetCreateRoom implements IRS2MS_RetCreateRoom {

        /**
         * Constructs a new RS2MS_RetCreateRoom.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRS2MS_RetCreateRoom);

        /** RS2MS_RetCreateRoom roomid. */
        public roomid: (number|Long);

        /** RS2MS_RetCreateRoom userid. */
        public userid: (number|Long);

        /** RS2MS_RetCreateRoom sidgate. */
        public sidgate: number;

        /** RS2MS_RetCreateRoom errcode. */
        public errcode: string;

        /**
         * Creates a new RS2MS_RetCreateRoom instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RS2MS_RetCreateRoom instance
         */
        public static create(properties?: msg.IRS2MS_RetCreateRoom): msg.RS2MS_RetCreateRoom;

        /**
         * Encodes the specified RS2MS_RetCreateRoom message. Does not implicitly {@link msg.RS2MS_RetCreateRoom.verify|verify} messages.
         * @param message RS2MS_RetCreateRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRS2MS_RetCreateRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified RS2MS_RetCreateRoom message, length delimited. Does not implicitly {@link msg.RS2MS_RetCreateRoom.verify|verify} messages.
         * @param message RS2MS_RetCreateRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRS2MS_RetCreateRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a RS2MS_RetCreateRoom message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RS2MS_RetCreateRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.RS2MS_RetCreateRoom;

        /**
         * Decodes a RS2MS_RetCreateRoom message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RS2MS_RetCreateRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.RS2MS_RetCreateRoom;

        /**
         * Verifies a RS2MS_RetCreateRoom message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RS2MS_RetCreateRoom message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RS2MS_RetCreateRoom
         */
        public static fromObject(object: { [k: string]: any }): msg.RS2MS_RetCreateRoom;

        /**
         * Creates a plain object from a RS2MS_RetCreateRoom message. Also converts values to other types if specified.
         * @param message RS2MS_RetCreateRoom
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RS2MS_RetCreateRoom, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RS2MS_RetCreateRoom to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RS2MS_DeleteRoom. */
    interface IRS2MS_DeleteRoom {

        /** RS2MS_DeleteRoom roomid */
        roomid?: (number|Long|null);
    }

    /** Represents a RS2MS_DeleteRoom. */
    class RS2MS_DeleteRoom implements IRS2MS_DeleteRoom {

        /**
         * Constructs a new RS2MS_DeleteRoom.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRS2MS_DeleteRoom);

        /** RS2MS_DeleteRoom roomid. */
        public roomid: (number|Long);

        /**
         * Creates a new RS2MS_DeleteRoom instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RS2MS_DeleteRoom instance
         */
        public static create(properties?: msg.IRS2MS_DeleteRoom): msg.RS2MS_DeleteRoom;

        /**
         * Encodes the specified RS2MS_DeleteRoom message. Does not implicitly {@link msg.RS2MS_DeleteRoom.verify|verify} messages.
         * @param message RS2MS_DeleteRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRS2MS_DeleteRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified RS2MS_DeleteRoom message, length delimited. Does not implicitly {@link msg.RS2MS_DeleteRoom.verify|verify} messages.
         * @param message RS2MS_DeleteRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRS2MS_DeleteRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a RS2MS_DeleteRoom message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RS2MS_DeleteRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.RS2MS_DeleteRoom;

        /**
         * Decodes a RS2MS_DeleteRoom message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RS2MS_DeleteRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.RS2MS_DeleteRoom;

        /**
         * Verifies a RS2MS_DeleteRoom message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RS2MS_DeleteRoom message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RS2MS_DeleteRoom
         */
        public static fromObject(object: { [k: string]: any }): msg.RS2MS_DeleteRoom;

        /**
         * Creates a plain object from a RS2MS_DeleteRoom message. Also converts values to other types if specified.
         * @param message RS2MS_DeleteRoom
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RS2MS_DeleteRoom, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RS2MS_DeleteRoom to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2RS_UploadUserBin. */
    interface IGW2RS_UploadUserBin {

        /** GW2RS_UploadUserBin roomid */
        roomid?: (number|Long|null);

        /** GW2RS_UploadUserBin userid */
        userid?: (number|Long|null);

        /** GW2RS_UploadUserBin bin */
        bin?: (msg.ISerialize|null);
    }

    /** Represents a GW2RS_UploadUserBin. */
    class GW2RS_UploadUserBin implements IGW2RS_UploadUserBin {

        /**
         * Constructs a new GW2RS_UploadUserBin.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2RS_UploadUserBin);

        /** GW2RS_UploadUserBin roomid. */
        public roomid: (number|Long);

        /** GW2RS_UploadUserBin userid. */
        public userid: (number|Long);

        /** GW2RS_UploadUserBin bin. */
        public bin?: (msg.ISerialize|null);

        /**
         * Creates a new GW2RS_UploadUserBin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2RS_UploadUserBin instance
         */
        public static create(properties?: msg.IGW2RS_UploadUserBin): msg.GW2RS_UploadUserBin;

        /**
         * Encodes the specified GW2RS_UploadUserBin message. Does not implicitly {@link msg.GW2RS_UploadUserBin.verify|verify} messages.
         * @param message GW2RS_UploadUserBin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2RS_UploadUserBin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2RS_UploadUserBin message, length delimited. Does not implicitly {@link msg.GW2RS_UploadUserBin.verify|verify} messages.
         * @param message GW2RS_UploadUserBin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2RS_UploadUserBin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2RS_UploadUserBin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2RS_UploadUserBin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2RS_UploadUserBin;

        /**
         * Decodes a GW2RS_UploadUserBin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2RS_UploadUserBin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2RS_UploadUserBin;

        /**
         * Verifies a GW2RS_UploadUserBin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2RS_UploadUserBin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2RS_UploadUserBin
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2RS_UploadUserBin;

        /**
         * Creates a plain object from a GW2RS_UploadUserBin message. Also converts values to other types if specified.
         * @param message GW2RS_UploadUserBin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2RS_UploadUserBin, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2RS_UploadUserBin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RS2GW_UserLeaveRoom. */
    interface IRS2GW_UserLeaveRoom {

        /** RS2GW_UserLeaveRoom userid */
        userid?: (number|Long|null);

        /** RS2GW_UserLeaveRoom bin */
        bin?: (msg.ISerialize|null);
    }

    /** Represents a RS2GW_UserLeaveRoom. */
    class RS2GW_UserLeaveRoom implements IRS2GW_UserLeaveRoom {

        /**
         * Constructs a new RS2GW_UserLeaveRoom.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRS2GW_UserLeaveRoom);

        /** RS2GW_UserLeaveRoom userid. */
        public userid: (number|Long);

        /** RS2GW_UserLeaveRoom bin. */
        public bin?: (msg.ISerialize|null);

        /**
         * Creates a new RS2GW_UserLeaveRoom instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RS2GW_UserLeaveRoom instance
         */
        public static create(properties?: msg.IRS2GW_UserLeaveRoom): msg.RS2GW_UserLeaveRoom;

        /**
         * Encodes the specified RS2GW_UserLeaveRoom message. Does not implicitly {@link msg.RS2GW_UserLeaveRoom.verify|verify} messages.
         * @param message RS2GW_UserLeaveRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRS2GW_UserLeaveRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified RS2GW_UserLeaveRoom message, length delimited. Does not implicitly {@link msg.RS2GW_UserLeaveRoom.verify|verify} messages.
         * @param message RS2GW_UserLeaveRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRS2GW_UserLeaveRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a RS2GW_UserLeaveRoom message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RS2GW_UserLeaveRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.RS2GW_UserLeaveRoom;

        /**
         * Decodes a RS2GW_UserLeaveRoom message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RS2GW_UserLeaveRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.RS2GW_UserLeaveRoom;

        /**
         * Verifies a RS2GW_UserLeaveRoom message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RS2GW_UserLeaveRoom message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RS2GW_UserLeaveRoom
         */
        public static fromObject(object: { [k: string]: any }): msg.RS2GW_UserLeaveRoom;

        /**
         * Creates a plain object from a RS2GW_UserLeaveRoom message. Also converts values to other types if specified.
         * @param message RS2GW_UserLeaveRoom
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RS2GW_UserLeaveRoom, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RS2GW_UserLeaveRoom to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_ReqEnterRoom. */
    interface IC2GW_ReqEnterRoom {

        /** C2GW_ReqEnterRoom roomid */
        roomid?: (number|Long|null);

        /** C2GW_ReqEnterRoom passwd */
        passwd?: (string|null);

        /** C2GW_ReqEnterRoom userid */
        userid?: (number|Long|null);
    }

    /** Represents a C2GW_ReqEnterRoom. */
    class C2GW_ReqEnterRoom implements IC2GW_ReqEnterRoom {

        /**
         * Constructs a new C2GW_ReqEnterRoom.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_ReqEnterRoom);

        /** C2GW_ReqEnterRoom roomid. */
        public roomid: (number|Long);

        /** C2GW_ReqEnterRoom passwd. */
        public passwd: string;

        /** C2GW_ReqEnterRoom userid. */
        public userid: (number|Long);

        /**
         * Creates a new C2GW_ReqEnterRoom instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_ReqEnterRoom instance
         */
        public static create(properties?: msg.IC2GW_ReqEnterRoom): msg.C2GW_ReqEnterRoom;

        /**
         * Encodes the specified C2GW_ReqEnterRoom message. Does not implicitly {@link msg.C2GW_ReqEnterRoom.verify|verify} messages.
         * @param message C2GW_ReqEnterRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_ReqEnterRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_ReqEnterRoom message, length delimited. Does not implicitly {@link msg.C2GW_ReqEnterRoom.verify|verify} messages.
         * @param message C2GW_ReqEnterRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_ReqEnterRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_ReqEnterRoom message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_ReqEnterRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_ReqEnterRoom;

        /**
         * Decodes a C2GW_ReqEnterRoom message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_ReqEnterRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_ReqEnterRoom;

        /**
         * Verifies a C2GW_ReqEnterRoom message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_ReqEnterRoom message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_ReqEnterRoom
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_ReqEnterRoom;

        /**
         * Creates a plain object from a C2GW_ReqEnterRoom message. Also converts values to other types if specified.
         * @param message C2GW_ReqEnterRoom
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_ReqEnterRoom, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_ReqEnterRoom to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_ReqLeaveRoom. */
    interface IC2GW_ReqLeaveRoom {

        /** C2GW_ReqLeaveRoom roomid */
        roomid?: (number|Long|null);

        /** C2GW_ReqLeaveRoom userid */
        userid?: (number|Long|null);
    }

    /** Represents a C2GW_ReqLeaveRoom. */
    class C2GW_ReqLeaveRoom implements IC2GW_ReqLeaveRoom {

        /**
         * Constructs a new C2GW_ReqLeaveRoom.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_ReqLeaveRoom);

        /** C2GW_ReqLeaveRoom roomid. */
        public roomid: (number|Long);

        /** C2GW_ReqLeaveRoom userid. */
        public userid: (number|Long);

        /**
         * Creates a new C2GW_ReqLeaveRoom instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_ReqLeaveRoom instance
         */
        public static create(properties?: msg.IC2GW_ReqLeaveRoom): msg.C2GW_ReqLeaveRoom;

        /**
         * Encodes the specified C2GW_ReqLeaveRoom message. Does not implicitly {@link msg.C2GW_ReqLeaveRoom.verify|verify} messages.
         * @param message C2GW_ReqLeaveRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_ReqLeaveRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_ReqLeaveRoom message, length delimited. Does not implicitly {@link msg.C2GW_ReqLeaveRoom.verify|verify} messages.
         * @param message C2GW_ReqLeaveRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_ReqLeaveRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_ReqLeaveRoom message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_ReqLeaveRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_ReqLeaveRoom;

        /**
         * Decodes a C2GW_ReqLeaveRoom message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_ReqLeaveRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_ReqLeaveRoom;

        /**
         * Verifies a C2GW_ReqLeaveRoom message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_ReqLeaveRoom message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_ReqLeaveRoom
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_ReqLeaveRoom;

        /**
         * Creates a plain object from a C2GW_ReqLeaveRoom message. Also converts values to other types if specified.
         * @param message C2GW_ReqLeaveRoom
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_ReqLeaveRoom, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_ReqLeaveRoom to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_RetLeaveRoom. */
    interface IGW2C_RetLeaveRoom {
    }

    /** Represents a GW2C_RetLeaveRoom. */
    class GW2C_RetLeaveRoom implements IGW2C_RetLeaveRoom {

        /**
         * Constructs a new GW2C_RetLeaveRoom.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_RetLeaveRoom);

        /**
         * Creates a new GW2C_RetLeaveRoom instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_RetLeaveRoom instance
         */
        public static create(properties?: msg.IGW2C_RetLeaveRoom): msg.GW2C_RetLeaveRoom;

        /**
         * Encodes the specified GW2C_RetLeaveRoom message. Does not implicitly {@link msg.GW2C_RetLeaveRoom.verify|verify} messages.
         * @param message GW2C_RetLeaveRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_RetLeaveRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_RetLeaveRoom message, length delimited. Does not implicitly {@link msg.GW2C_RetLeaveRoom.verify|verify} messages.
         * @param message GW2C_RetLeaveRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_RetLeaveRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_RetLeaveRoom message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_RetLeaveRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_RetLeaveRoom;

        /**
         * Decodes a GW2C_RetLeaveRoom message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_RetLeaveRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_RetLeaveRoom;

        /**
         * Verifies a GW2C_RetLeaveRoom message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_RetLeaveRoom message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_RetLeaveRoom
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_RetLeaveRoom;

        /**
         * Creates a plain object from a GW2C_RetLeaveRoom message. Also converts values to other types if specified.
         * @param message GW2C_RetLeaveRoom
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_RetLeaveRoom, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_RetLeaveRoom to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RS2GW_PushRoomDestory. */
    interface IRS2GW_PushRoomDestory {

        /** RS2GW_PushRoomDestory roomid */
        roomid?: (number|Long|null);
    }

    /** Represents a RS2GW_PushRoomDestory. */
    class RS2GW_PushRoomDestory implements IRS2GW_PushRoomDestory {

        /**
         * Constructs a new RS2GW_PushRoomDestory.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRS2GW_PushRoomDestory);

        /** RS2GW_PushRoomDestory roomid. */
        public roomid: (number|Long);

        /**
         * Creates a new RS2GW_PushRoomDestory instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RS2GW_PushRoomDestory instance
         */
        public static create(properties?: msg.IRS2GW_PushRoomDestory): msg.RS2GW_PushRoomDestory;

        /**
         * Encodes the specified RS2GW_PushRoomDestory message. Does not implicitly {@link msg.RS2GW_PushRoomDestory.verify|verify} messages.
         * @param message RS2GW_PushRoomDestory message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRS2GW_PushRoomDestory, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified RS2GW_PushRoomDestory message, length delimited. Does not implicitly {@link msg.RS2GW_PushRoomDestory.verify|verify} messages.
         * @param message RS2GW_PushRoomDestory message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRS2GW_PushRoomDestory, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a RS2GW_PushRoomDestory message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RS2GW_PushRoomDestory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.RS2GW_PushRoomDestory;

        /**
         * Decodes a RS2GW_PushRoomDestory message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RS2GW_PushRoomDestory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.RS2GW_PushRoomDestory;

        /**
         * Verifies a RS2GW_PushRoomDestory message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RS2GW_PushRoomDestory message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RS2GW_PushRoomDestory
         */
        public static fromObject(object: { [k: string]: any }): msg.RS2GW_PushRoomDestory;

        /**
         * Creates a plain object from a RS2GW_PushRoomDestory message. Also converts values to other types if specified.
         * @param message RS2GW_PushRoomDestory
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RS2GW_PushRoomDestory, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RS2GW_PushRoomDestory to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_PushRoomDestory. */
    interface IGW2C_PushRoomDestory {

        /** GW2C_PushRoomDestory roomid */
        roomid?: (number|Long|null);
    }

    /** Represents a GW2C_PushRoomDestory. */
    class GW2C_PushRoomDestory implements IGW2C_PushRoomDestory {

        /**
         * Constructs a new GW2C_PushRoomDestory.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_PushRoomDestory);

        /** GW2C_PushRoomDestory roomid. */
        public roomid: (number|Long);

        /**
         * Creates a new GW2C_PushRoomDestory instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_PushRoomDestory instance
         */
        public static create(properties?: msg.IGW2C_PushRoomDestory): msg.GW2C_PushRoomDestory;

        /**
         * Encodes the specified GW2C_PushRoomDestory message. Does not implicitly {@link msg.GW2C_PushRoomDestory.verify|verify} messages.
         * @param message GW2C_PushRoomDestory message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_PushRoomDestory, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_PushRoomDestory message, length delimited. Does not implicitly {@link msg.GW2C_PushRoomDestory.verify|verify} messages.
         * @param message GW2C_PushRoomDestory message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_PushRoomDestory, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_PushRoomDestory message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_PushRoomDestory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_PushRoomDestory;

        /**
         * Decodes a GW2C_PushRoomDestory message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_PushRoomDestory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_PushRoomDestory;

        /**
         * Verifies a GW2C_PushRoomDestory message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_PushRoomDestory message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_PushRoomDestory
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_PushRoomDestory;

        /**
         * Creates a plain object from a GW2C_PushRoomDestory message. Also converts values to other types if specified.
         * @param message GW2C_PushRoomDestory
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_PushRoomDestory, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_PushRoomDestory to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TexasRoomSimpleInfo. */
    interface ITexasRoomSimpleInfo {

        /** TexasRoomSimpleInfo id */
        id?: (number|Long|null);

        /** TexasRoomSimpleInfo player */
        player?: (number|null);

        /** TexasRoomSimpleInfo roomId */
        roomId?: (number|null);

        /** TexasRoomSimpleInfo hasPwd */
        hasPwd?: (boolean|null);
    }

    /** Represents a TexasRoomSimpleInfo. */
    class TexasRoomSimpleInfo implements ITexasRoomSimpleInfo {

        /**
         * Constructs a new TexasRoomSimpleInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ITexasRoomSimpleInfo);

        /** TexasRoomSimpleInfo id. */
        public id: (number|Long);

        /** TexasRoomSimpleInfo player. */
        public player: number;

        /** TexasRoomSimpleInfo roomId. */
        public roomId: number;

        /** TexasRoomSimpleInfo hasPwd. */
        public hasPwd: boolean;

        /**
         * Creates a new TexasRoomSimpleInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TexasRoomSimpleInfo instance
         */
        public static create(properties?: msg.ITexasRoomSimpleInfo): msg.TexasRoomSimpleInfo;

        /**
         * Encodes the specified TexasRoomSimpleInfo message. Does not implicitly {@link msg.TexasRoomSimpleInfo.verify|verify} messages.
         * @param message TexasRoomSimpleInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ITexasRoomSimpleInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TexasRoomSimpleInfo message, length delimited. Does not implicitly {@link msg.TexasRoomSimpleInfo.verify|verify} messages.
         * @param message TexasRoomSimpleInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ITexasRoomSimpleInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TexasRoomSimpleInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TexasRoomSimpleInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.TexasRoomSimpleInfo;

        /**
         * Decodes a TexasRoomSimpleInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TexasRoomSimpleInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.TexasRoomSimpleInfo;

        /**
         * Verifies a TexasRoomSimpleInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TexasRoomSimpleInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TexasRoomSimpleInfo
         */
        public static fromObject(object: { [k: string]: any }): msg.TexasRoomSimpleInfo;

        /**
         * Creates a plain object from a TexasRoomSimpleInfo message. Also converts values to other types if specified.
         * @param message TexasRoomSimpleInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.TexasRoomSimpleInfo, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TexasRoomSimpleInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_ReqTexasRoomList. */
    interface IC2GW_ReqTexasRoomList {

        /** C2GW_ReqTexasRoomList type */
        type?: (number|null);
    }

    /** Represents a C2GW_ReqTexasRoomList. */
    class C2GW_ReqTexasRoomList implements IC2GW_ReqTexasRoomList {

        /**
         * Constructs a new C2GW_ReqTexasRoomList.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_ReqTexasRoomList);

        /** C2GW_ReqTexasRoomList type. */
        public type: number;

        /**
         * Creates a new C2GW_ReqTexasRoomList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_ReqTexasRoomList instance
         */
        public static create(properties?: msg.IC2GW_ReqTexasRoomList): msg.C2GW_ReqTexasRoomList;

        /**
         * Encodes the specified C2GW_ReqTexasRoomList message. Does not implicitly {@link msg.C2GW_ReqTexasRoomList.verify|verify} messages.
         * @param message C2GW_ReqTexasRoomList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_ReqTexasRoomList, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_ReqTexasRoomList message, length delimited. Does not implicitly {@link msg.C2GW_ReqTexasRoomList.verify|verify} messages.
         * @param message C2GW_ReqTexasRoomList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_ReqTexasRoomList, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_ReqTexasRoomList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_ReqTexasRoomList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_ReqTexasRoomList;

        /**
         * Decodes a C2GW_ReqTexasRoomList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_ReqTexasRoomList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_ReqTexasRoomList;

        /**
         * Verifies a C2GW_ReqTexasRoomList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_ReqTexasRoomList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_ReqTexasRoomList
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_ReqTexasRoomList;

        /**
         * Creates a plain object from a C2GW_ReqTexasRoomList message. Also converts values to other types if specified.
         * @param message C2GW_ReqTexasRoomList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_ReqTexasRoomList, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_ReqTexasRoomList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_RetTexasRoomList. */
    interface IGW2C_RetTexasRoomList {

        /** GW2C_RetTexasRoomList list */
        list?: (msg.ITexasRoomSimpleInfo[]|null);
    }

    /** Represents a GW2C_RetTexasRoomList. */
    class GW2C_RetTexasRoomList implements IGW2C_RetTexasRoomList {

        /**
         * Constructs a new GW2C_RetTexasRoomList.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_RetTexasRoomList);

        /** GW2C_RetTexasRoomList list. */
        public list: msg.ITexasRoomSimpleInfo[];

        /**
         * Creates a new GW2C_RetTexasRoomList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_RetTexasRoomList instance
         */
        public static create(properties?: msg.IGW2C_RetTexasRoomList): msg.GW2C_RetTexasRoomList;

        /**
         * Encodes the specified GW2C_RetTexasRoomList message. Does not implicitly {@link msg.GW2C_RetTexasRoomList.verify|verify} messages.
         * @param message GW2C_RetTexasRoomList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_RetTexasRoomList, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_RetTexasRoomList message, length delimited. Does not implicitly {@link msg.GW2C_RetTexasRoomList.verify|verify} messages.
         * @param message GW2C_RetTexasRoomList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_RetTexasRoomList, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_RetTexasRoomList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_RetTexasRoomList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_RetTexasRoomList;

        /**
         * Decodes a GW2C_RetTexasRoomList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_RetTexasRoomList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_RetTexasRoomList;

        /**
         * Verifies a GW2C_RetTexasRoomList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_RetTexasRoomList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_RetTexasRoomList
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_RetTexasRoomList;

        /**
         * Creates a plain object from a GW2C_RetTexasRoomList message. Also converts values to other types if specified.
         * @param message GW2C_RetTexasRoomList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_RetTexasRoomList, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_RetTexasRoomList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TexasPersonalRoom. */
    interface ITexasPersonalRoom {

        /** TexasPersonalRoom roomId */
        roomId?: (number|null);

        /** TexasPersonalRoom ante */
        ante?: (number|null);

        /** TexasPersonalRoom pwd */
        pwd?: (string|null);
    }

    /** Represents a TexasPersonalRoom. */
    class TexasPersonalRoom implements ITexasPersonalRoom {

        /**
         * Constructs a new TexasPersonalRoom.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ITexasPersonalRoom);

        /** TexasPersonalRoom roomId. */
        public roomId: number;

        /** TexasPersonalRoom ante. */
        public ante: number;

        /** TexasPersonalRoom pwd. */
        public pwd: string;

        /**
         * Creates a new TexasPersonalRoom instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TexasPersonalRoom instance
         */
        public static create(properties?: msg.ITexasPersonalRoom): msg.TexasPersonalRoom;

        /**
         * Encodes the specified TexasPersonalRoom message. Does not implicitly {@link msg.TexasPersonalRoom.verify|verify} messages.
         * @param message TexasPersonalRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ITexasPersonalRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TexasPersonalRoom message, length delimited. Does not implicitly {@link msg.TexasPersonalRoom.verify|verify} messages.
         * @param message TexasPersonalRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ITexasPersonalRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TexasPersonalRoom message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TexasPersonalRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.TexasPersonalRoom;

        /**
         * Decodes a TexasPersonalRoom message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TexasPersonalRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.TexasPersonalRoom;

        /**
         * Verifies a TexasPersonalRoom message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TexasPersonalRoom message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TexasPersonalRoom
         */
        public static fromObject(object: { [k: string]: any }): msg.TexasPersonalRoom;

        /**
         * Creates a plain object from a TexasPersonalRoom message. Also converts values to other types if specified.
         * @param message TexasPersonalRoom
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.TexasPersonalRoom, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TexasPersonalRoom to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_ReqUserRoomInfo. */
    interface IC2GW_ReqUserRoomInfo {
    }

    /** Represents a C2GW_ReqUserRoomInfo. */
    class C2GW_ReqUserRoomInfo implements IC2GW_ReqUserRoomInfo {

        /**
         * Constructs a new C2GW_ReqUserRoomInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_ReqUserRoomInfo);

        /**
         * Creates a new C2GW_ReqUserRoomInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_ReqUserRoomInfo instance
         */
        public static create(properties?: msg.IC2GW_ReqUserRoomInfo): msg.C2GW_ReqUserRoomInfo;

        /**
         * Encodes the specified C2GW_ReqUserRoomInfo message. Does not implicitly {@link msg.C2GW_ReqUserRoomInfo.verify|verify} messages.
         * @param message C2GW_ReqUserRoomInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_ReqUserRoomInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_ReqUserRoomInfo message, length delimited. Does not implicitly {@link msg.C2GW_ReqUserRoomInfo.verify|verify} messages.
         * @param message C2GW_ReqUserRoomInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_ReqUserRoomInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_ReqUserRoomInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_ReqUserRoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_ReqUserRoomInfo;

        /**
         * Decodes a C2GW_ReqUserRoomInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_ReqUserRoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_ReqUserRoomInfo;

        /**
         * Verifies a C2GW_ReqUserRoomInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_ReqUserRoomInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_ReqUserRoomInfo
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_ReqUserRoomInfo;

        /**
         * Creates a plain object from a C2GW_ReqUserRoomInfo message. Also converts values to other types if specified.
         * @param message C2GW_ReqUserRoomInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_ReqUserRoomInfo, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_ReqUserRoomInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_RetUserRoomInfo. */
    interface IGW2C_RetUserRoomInfo {

        /** GW2C_RetUserRoomInfo roomid */
        roomid?: (number|Long|null);

        /** GW2C_RetUserRoomInfo tid */
        tid?: (number|null);

        /** GW2C_RetUserRoomInfo passwd */
        passwd?: (string|null);
    }

    /** Represents a GW2C_RetUserRoomInfo. */
    class GW2C_RetUserRoomInfo implements IGW2C_RetUserRoomInfo {

        /**
         * Constructs a new GW2C_RetUserRoomInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_RetUserRoomInfo);

        /** GW2C_RetUserRoomInfo roomid. */
        public roomid: (number|Long);

        /** GW2C_RetUserRoomInfo tid. */
        public tid: number;

        /** GW2C_RetUserRoomInfo passwd. */
        public passwd: string;

        /**
         * Creates a new GW2C_RetUserRoomInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_RetUserRoomInfo instance
         */
        public static create(properties?: msg.IGW2C_RetUserRoomInfo): msg.GW2C_RetUserRoomInfo;

        /**
         * Encodes the specified GW2C_RetUserRoomInfo message. Does not implicitly {@link msg.GW2C_RetUserRoomInfo.verify|verify} messages.
         * @param message GW2C_RetUserRoomInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_RetUserRoomInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_RetUserRoomInfo message, length delimited. Does not implicitly {@link msg.GW2C_RetUserRoomInfo.verify|verify} messages.
         * @param message GW2C_RetUserRoomInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_RetUserRoomInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_RetUserRoomInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_RetUserRoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_RetUserRoomInfo;

        /**
         * Decodes a GW2C_RetUserRoomInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_RetUserRoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_RetUserRoomInfo;

        /**
         * Verifies a GW2C_RetUserRoomInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_RetUserRoomInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_RetUserRoomInfo
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_RetUserRoomInfo;

        /**
         * Creates a plain object from a GW2C_RetUserRoomInfo message. Also converts values to other types if specified.
         * @param message GW2C_RetUserRoomInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_RetUserRoomInfo, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_RetUserRoomInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2L_ReqRegist. */
    interface IGW2L_ReqRegist {

        /** GW2L_ReqRegist account */
        account?: (string|null);

        /** GW2L_ReqRegist passwd */
        passwd?: (string|null);

        /** GW2L_ReqRegist host */
        host?: (msg.IIpHost|null);

        /** GW2L_ReqRegist name */
        name?: (string|null);
    }

    /** Represents a GW2L_ReqRegist. */
    class GW2L_ReqRegist implements IGW2L_ReqRegist {

        /**
         * Constructs a new GW2L_ReqRegist.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2L_ReqRegist);

        /** GW2L_ReqRegist account. */
        public account: string;

        /** GW2L_ReqRegist passwd. */
        public passwd: string;

        /** GW2L_ReqRegist host. */
        public host?: (msg.IIpHost|null);

        /** GW2L_ReqRegist name. */
        public name: string;

        /**
         * Creates a new GW2L_ReqRegist instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2L_ReqRegist instance
         */
        public static create(properties?: msg.IGW2L_ReqRegist): msg.GW2L_ReqRegist;

        /**
         * Encodes the specified GW2L_ReqRegist message. Does not implicitly {@link msg.GW2L_ReqRegist.verify|verify} messages.
         * @param message GW2L_ReqRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2L_ReqRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2L_ReqRegist message, length delimited. Does not implicitly {@link msg.GW2L_ReqRegist.verify|verify} messages.
         * @param message GW2L_ReqRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2L_ReqRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2L_ReqRegist message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2L_ReqRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2L_ReqRegist;

        /**
         * Decodes a GW2L_ReqRegist message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2L_ReqRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2L_ReqRegist;

        /**
         * Verifies a GW2L_ReqRegist message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2L_ReqRegist message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2L_ReqRegist
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2L_ReqRegist;

        /**
         * Creates a plain object from a GW2L_ReqRegist message. Also converts values to other types if specified.
         * @param message GW2L_ReqRegist
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2L_ReqRegist, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2L_ReqRegist to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a L2GW_RetRegist. */
    interface IL2GW_RetRegist {

        /** L2GW_RetRegist errocde */
        errocde?: (string|null);

        /** L2GW_RetRegist host */
        host?: (msg.IIpHost|null);
    }

    /** Represents a L2GW_RetRegist. */
    class L2GW_RetRegist implements IL2GW_RetRegist {

        /**
         * Constructs a new L2GW_RetRegist.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IL2GW_RetRegist);

        /** L2GW_RetRegist errocde. */
        public errocde: string;

        /** L2GW_RetRegist host. */
        public host?: (msg.IIpHost|null);

        /**
         * Creates a new L2GW_RetRegist instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2GW_RetRegist instance
         */
        public static create(properties?: msg.IL2GW_RetRegist): msg.L2GW_RetRegist;

        /**
         * Encodes the specified L2GW_RetRegist message. Does not implicitly {@link msg.L2GW_RetRegist.verify|verify} messages.
         * @param message L2GW_RetRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IL2GW_RetRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified L2GW_RetRegist message, length delimited. Does not implicitly {@link msg.L2GW_RetRegist.verify|verify} messages.
         * @param message L2GW_RetRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IL2GW_RetRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a L2GW_RetRegist message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns L2GW_RetRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.L2GW_RetRegist;

        /**
         * Decodes a L2GW_RetRegist message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns L2GW_RetRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.L2GW_RetRegist;

        /**
         * Verifies a L2GW_RetRegist message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a L2GW_RetRegist message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns L2GW_RetRegist
         */
        public static fromObject(object: { [k: string]: any }): msg.L2GW_RetRegist;

        /**
         * Creates a plain object from a L2GW_RetRegist message. Also converts values to other types if specified.
         * @param message L2GW_RetRegist
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.L2GW_RetRegist, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this L2GW_RetRegist to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2L_HeartBeat. */
    interface IGW2L_HeartBeat {
    }

    /** Represents a GW2L_HeartBeat. */
    class GW2L_HeartBeat implements IGW2L_HeartBeat {

        /**
         * Constructs a new GW2L_HeartBeat.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2L_HeartBeat);

        /**
         * Creates a new GW2L_HeartBeat instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2L_HeartBeat instance
         */
        public static create(properties?: msg.IGW2L_HeartBeat): msg.GW2L_HeartBeat;

        /**
         * Encodes the specified GW2L_HeartBeat message. Does not implicitly {@link msg.GW2L_HeartBeat.verify|verify} messages.
         * @param message GW2L_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2L_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2L_HeartBeat message, length delimited. Does not implicitly {@link msg.GW2L_HeartBeat.verify|verify} messages.
         * @param message GW2L_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2L_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2L_HeartBeat message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2L_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2L_HeartBeat;

        /**
         * Decodes a GW2L_HeartBeat message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2L_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2L_HeartBeat;

        /**
         * Verifies a GW2L_HeartBeat message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2L_HeartBeat message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2L_HeartBeat
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2L_HeartBeat;

        /**
         * Creates a plain object from a GW2L_HeartBeat message. Also converts values to other types if specified.
         * @param message GW2L_HeartBeat
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2L_HeartBeat, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2L_HeartBeat to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a L2GW_HeartBeat. */
    interface IL2GW_HeartBeat {
    }

    /** Represents a L2GW_HeartBeat. */
    class L2GW_HeartBeat implements IL2GW_HeartBeat {

        /**
         * Constructs a new L2GW_HeartBeat.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IL2GW_HeartBeat);

        /**
         * Creates a new L2GW_HeartBeat instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2GW_HeartBeat instance
         */
        public static create(properties?: msg.IL2GW_HeartBeat): msg.L2GW_HeartBeat;

        /**
         * Encodes the specified L2GW_HeartBeat message. Does not implicitly {@link msg.L2GW_HeartBeat.verify|verify} messages.
         * @param message L2GW_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IL2GW_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified L2GW_HeartBeat message, length delimited. Does not implicitly {@link msg.L2GW_HeartBeat.verify|verify} messages.
         * @param message L2GW_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IL2GW_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a L2GW_HeartBeat message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns L2GW_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.L2GW_HeartBeat;

        /**
         * Decodes a L2GW_HeartBeat message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns L2GW_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.L2GW_HeartBeat;

        /**
         * Verifies a L2GW_HeartBeat message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a L2GW_HeartBeat message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns L2GW_HeartBeat
         */
        public static fromObject(object: { [k: string]: any }): msg.L2GW_HeartBeat;

        /**
         * Creates a plain object from a L2GW_HeartBeat message. Also converts values to other types if specified.
         * @param message L2GW_HeartBeat
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.L2GW_HeartBeat, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this L2GW_HeartBeat to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a L2GW_ReqRegistUser. */
    interface IL2GW_ReqRegistUser {

        /** L2GW_ReqRegistUser account */
        account?: (string|null);

        /** L2GW_ReqRegistUser expire */
        expire?: (number|Long|null);

        /** L2GW_ReqRegistUser gatehost */
        gatehost?: (string|null);

        /** L2GW_ReqRegistUser sid */
        sid?: (number|null);

        /** L2GW_ReqRegistUser timestamp */
        timestamp?: (number|Long|null);

        /** L2GW_ReqRegistUser verifykey */
        verifykey?: (string|null);
    }

    /** Represents a L2GW_ReqRegistUser. */
    class L2GW_ReqRegistUser implements IL2GW_ReqRegistUser {

        /**
         * Constructs a new L2GW_ReqRegistUser.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IL2GW_ReqRegistUser);

        /** L2GW_ReqRegistUser account. */
        public account: string;

        /** L2GW_ReqRegistUser expire. */
        public expire: (number|Long);

        /** L2GW_ReqRegistUser gatehost. */
        public gatehost: string;

        /** L2GW_ReqRegistUser sid. */
        public sid: number;

        /** L2GW_ReqRegistUser timestamp. */
        public timestamp: (number|Long);

        /** L2GW_ReqRegistUser verifykey. */
        public verifykey: string;

        /**
         * Creates a new L2GW_ReqRegistUser instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2GW_ReqRegistUser instance
         */
        public static create(properties?: msg.IL2GW_ReqRegistUser): msg.L2GW_ReqRegistUser;

        /**
         * Encodes the specified L2GW_ReqRegistUser message. Does not implicitly {@link msg.L2GW_ReqRegistUser.verify|verify} messages.
         * @param message L2GW_ReqRegistUser message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IL2GW_ReqRegistUser, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified L2GW_ReqRegistUser message, length delimited. Does not implicitly {@link msg.L2GW_ReqRegistUser.verify|verify} messages.
         * @param message L2GW_ReqRegistUser message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IL2GW_ReqRegistUser, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a L2GW_ReqRegistUser message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns L2GW_ReqRegistUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.L2GW_ReqRegistUser;

        /**
         * Decodes a L2GW_ReqRegistUser message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns L2GW_ReqRegistUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.L2GW_ReqRegistUser;

        /**
         * Verifies a L2GW_ReqRegistUser message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a L2GW_ReqRegistUser message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns L2GW_ReqRegistUser
         */
        public static fromObject(object: { [k: string]: any }): msg.L2GW_ReqRegistUser;

        /**
         * Creates a plain object from a L2GW_ReqRegistUser message. Also converts values to other types if specified.
         * @param message L2GW_ReqRegistUser
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.L2GW_ReqRegistUser, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this L2GW_ReqRegistUser to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2L_RegistUserRet. */
    interface IGW2L_RegistUserRet {

        /** GW2L_RegistUserRet account */
        account?: (string|null);

        /** GW2L_RegistUserRet gatehost */
        gatehost?: (string|null);

        /** GW2L_RegistUserRet errcode */
        errcode?: (string|null);

        /** GW2L_RegistUserRet sid */
        sid?: (number|null);

        /** GW2L_RegistUserRet verifykey */
        verifykey?: (string|null);
    }

    /** Represents a GW2L_RegistUserRet. */
    class GW2L_RegistUserRet implements IGW2L_RegistUserRet {

        /**
         * Constructs a new GW2L_RegistUserRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2L_RegistUserRet);

        /** GW2L_RegistUserRet account. */
        public account: string;

        /** GW2L_RegistUserRet gatehost. */
        public gatehost: string;

        /** GW2L_RegistUserRet errcode. */
        public errcode: string;

        /** GW2L_RegistUserRet sid. */
        public sid: number;

        /** GW2L_RegistUserRet verifykey. */
        public verifykey: string;

        /**
         * Creates a new GW2L_RegistUserRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2L_RegistUserRet instance
         */
        public static create(properties?: msg.IGW2L_RegistUserRet): msg.GW2L_RegistUserRet;

        /**
         * Encodes the specified GW2L_RegistUserRet message. Does not implicitly {@link msg.GW2L_RegistUserRet.verify|verify} messages.
         * @param message GW2L_RegistUserRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2L_RegistUserRet, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2L_RegistUserRet message, length delimited. Does not implicitly {@link msg.GW2L_RegistUserRet.verify|verify} messages.
         * @param message GW2L_RegistUserRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2L_RegistUserRet, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2L_RegistUserRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2L_RegistUserRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2L_RegistUserRet;

        /**
         * Decodes a GW2L_RegistUserRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2L_RegistUserRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2L_RegistUserRet;

        /**
         * Verifies a GW2L_RegistUserRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2L_RegistUserRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2L_RegistUserRet
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2L_RegistUserRet;

        /**
         * Creates a plain object from a GW2L_RegistUserRet message. Also converts values to other types if specified.
         * @param message GW2L_RegistUserRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2L_RegistUserRet, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2L_RegistUserRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2MS_ReqRegist. */
    interface IGW2MS_ReqRegist {

        /** GW2MS_ReqRegist account */
        account?: (string|null);

        /** GW2MS_ReqRegist passwd */
        passwd?: (string|null);

        /** GW2MS_ReqRegist agentname */
        agentname?: (string|null);

        /** GW2MS_ReqRegist host */
        host?: (msg.IIpHost|null);
    }

    /** Represents a GW2MS_ReqRegist. */
    class GW2MS_ReqRegist implements IGW2MS_ReqRegist {

        /**
         * Constructs a new GW2MS_ReqRegist.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2MS_ReqRegist);

        /** GW2MS_ReqRegist account. */
        public account: string;

        /** GW2MS_ReqRegist passwd. */
        public passwd: string;

        /** GW2MS_ReqRegist agentname. */
        public agentname: string;

        /** GW2MS_ReqRegist host. */
        public host?: (msg.IIpHost|null);

        /**
         * Creates a new GW2MS_ReqRegist instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2MS_ReqRegist instance
         */
        public static create(properties?: msg.IGW2MS_ReqRegist): msg.GW2MS_ReqRegist;

        /**
         * Encodes the specified GW2MS_ReqRegist message. Does not implicitly {@link msg.GW2MS_ReqRegist.verify|verify} messages.
         * @param message GW2MS_ReqRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2MS_ReqRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2MS_ReqRegist message, length delimited. Does not implicitly {@link msg.GW2MS_ReqRegist.verify|verify} messages.
         * @param message GW2MS_ReqRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2MS_ReqRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2MS_ReqRegist message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2MS_ReqRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2MS_ReqRegist;

        /**
         * Decodes a GW2MS_ReqRegist message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2MS_ReqRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2MS_ReqRegist;

        /**
         * Verifies a GW2MS_ReqRegist message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2MS_ReqRegist message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2MS_ReqRegist
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2MS_ReqRegist;

        /**
         * Creates a plain object from a GW2MS_ReqRegist message. Also converts values to other types if specified.
         * @param message GW2MS_ReqRegist
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2MS_ReqRegist, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2MS_ReqRegist to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MS2GW_RetRegist. */
    interface IMS2GW_RetRegist {

        /** MS2GW_RetRegist errcode */
        errcode?: (string|null);

        /** MS2GW_RetRegist host */
        host?: (msg.IIpHost|null);
    }

    /** Represents a MS2GW_RetRegist. */
    class MS2GW_RetRegist implements IMS2GW_RetRegist {

        /**
         * Constructs a new MS2GW_RetRegist.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IMS2GW_RetRegist);

        /** MS2GW_RetRegist errcode. */
        public errcode: string;

        /** MS2GW_RetRegist host. */
        public host?: (msg.IIpHost|null);

        /**
         * Creates a new MS2GW_RetRegist instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MS2GW_RetRegist instance
         */
        public static create(properties?: msg.IMS2GW_RetRegist): msg.MS2GW_RetRegist;

        /**
         * Encodes the specified MS2GW_RetRegist message. Does not implicitly {@link msg.MS2GW_RetRegist.verify|verify} messages.
         * @param message MS2GW_RetRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IMS2GW_RetRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified MS2GW_RetRegist message, length delimited. Does not implicitly {@link msg.MS2GW_RetRegist.verify|verify} messages.
         * @param message MS2GW_RetRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IMS2GW_RetRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a MS2GW_RetRegist message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MS2GW_RetRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.MS2GW_RetRegist;

        /**
         * Decodes a MS2GW_RetRegist message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MS2GW_RetRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.MS2GW_RetRegist;

        /**
         * Verifies a MS2GW_RetRegist message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MS2GW_RetRegist message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MS2GW_RetRegist
         */
        public static fromObject(object: { [k: string]: any }): msg.MS2GW_RetRegist;

        /**
         * Creates a plain object from a MS2GW_RetRegist message. Also converts values to other types if specified.
         * @param message MS2GW_RetRegist
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.MS2GW_RetRegist, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MS2GW_RetRegist to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2MS_HeartBeat. */
    interface IGW2MS_HeartBeat {
    }

    /** Represents a GW2MS_HeartBeat. */
    class GW2MS_HeartBeat implements IGW2MS_HeartBeat {

        /**
         * Constructs a new GW2MS_HeartBeat.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2MS_HeartBeat);

        /**
         * Creates a new GW2MS_HeartBeat instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2MS_HeartBeat instance
         */
        public static create(properties?: msg.IGW2MS_HeartBeat): msg.GW2MS_HeartBeat;

        /**
         * Encodes the specified GW2MS_HeartBeat message. Does not implicitly {@link msg.GW2MS_HeartBeat.verify|verify} messages.
         * @param message GW2MS_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2MS_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2MS_HeartBeat message, length delimited. Does not implicitly {@link msg.GW2MS_HeartBeat.verify|verify} messages.
         * @param message GW2MS_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2MS_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2MS_HeartBeat message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2MS_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2MS_HeartBeat;

        /**
         * Decodes a GW2MS_HeartBeat message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2MS_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2MS_HeartBeat;

        /**
         * Verifies a GW2MS_HeartBeat message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2MS_HeartBeat message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2MS_HeartBeat
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2MS_HeartBeat;

        /**
         * Creates a plain object from a GW2MS_HeartBeat message. Also converts values to other types if specified.
         * @param message GW2MS_HeartBeat
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2MS_HeartBeat, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2MS_HeartBeat to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MS2GW_HeartBeat. */
    interface IMS2GW_HeartBeat {
    }

    /** Represents a MS2GW_HeartBeat. */
    class MS2GW_HeartBeat implements IMS2GW_HeartBeat {

        /**
         * Constructs a new MS2GW_HeartBeat.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IMS2GW_HeartBeat);

        /**
         * Creates a new MS2GW_HeartBeat instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MS2GW_HeartBeat instance
         */
        public static create(properties?: msg.IMS2GW_HeartBeat): msg.MS2GW_HeartBeat;

        /**
         * Encodes the specified MS2GW_HeartBeat message. Does not implicitly {@link msg.MS2GW_HeartBeat.verify|verify} messages.
         * @param message MS2GW_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IMS2GW_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified MS2GW_HeartBeat message, length delimited. Does not implicitly {@link msg.MS2GW_HeartBeat.verify|verify} messages.
         * @param message MS2GW_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IMS2GW_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a MS2GW_HeartBeat message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MS2GW_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.MS2GW_HeartBeat;

        /**
         * Decodes a MS2GW_HeartBeat message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MS2GW_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.MS2GW_HeartBeat;

        /**
         * Verifies a MS2GW_HeartBeat message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MS2GW_HeartBeat message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MS2GW_HeartBeat
         */
        public static fromObject(object: { [k: string]: any }): msg.MS2GW_HeartBeat;

        /**
         * Creates a plain object from a MS2GW_HeartBeat message. Also converts values to other types if specified.
         * @param message MS2GW_HeartBeat
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.MS2GW_HeartBeat, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MS2GW_HeartBeat to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RS2GW_ReqRegist. */
    interface IRS2GW_ReqRegist {

        /** RS2GW_ReqRegist account */
        account?: (string|null);

        /** RS2GW_ReqRegist passwd */
        passwd?: (string|null);

        /** RS2GW_ReqRegist agentname */
        agentname?: (string|null);
    }

    /** Represents a RS2GW_ReqRegist. */
    class RS2GW_ReqRegist implements IRS2GW_ReqRegist {

        /**
         * Constructs a new RS2GW_ReqRegist.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRS2GW_ReqRegist);

        /** RS2GW_ReqRegist account. */
        public account: string;

        /** RS2GW_ReqRegist passwd. */
        public passwd: string;

        /** RS2GW_ReqRegist agentname. */
        public agentname: string;

        /**
         * Creates a new RS2GW_ReqRegist instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RS2GW_ReqRegist instance
         */
        public static create(properties?: msg.IRS2GW_ReqRegist): msg.RS2GW_ReqRegist;

        /**
         * Encodes the specified RS2GW_ReqRegist message. Does not implicitly {@link msg.RS2GW_ReqRegist.verify|verify} messages.
         * @param message RS2GW_ReqRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRS2GW_ReqRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified RS2GW_ReqRegist message, length delimited. Does not implicitly {@link msg.RS2GW_ReqRegist.verify|verify} messages.
         * @param message RS2GW_ReqRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRS2GW_ReqRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a RS2GW_ReqRegist message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RS2GW_ReqRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.RS2GW_ReqRegist;

        /**
         * Decodes a RS2GW_ReqRegist message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RS2GW_ReqRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.RS2GW_ReqRegist;

        /**
         * Verifies a RS2GW_ReqRegist message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RS2GW_ReqRegist message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RS2GW_ReqRegist
         */
        public static fromObject(object: { [k: string]: any }): msg.RS2GW_ReqRegist;

        /**
         * Creates a plain object from a RS2GW_ReqRegist message. Also converts values to other types if specified.
         * @param message RS2GW_ReqRegist
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RS2GW_ReqRegist, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RS2GW_ReqRegist to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2RS_RetRegist. */
    interface IGW2RS_RetRegist {

        /** GW2RS_RetRegist errcode */
        errcode?: (string|null);

        /** GW2RS_RetRegist agentname */
        agentname?: (string|null);
    }

    /** Represents a GW2RS_RetRegist. */
    class GW2RS_RetRegist implements IGW2RS_RetRegist {

        /**
         * Constructs a new GW2RS_RetRegist.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2RS_RetRegist);

        /** GW2RS_RetRegist errcode. */
        public errcode: string;

        /** GW2RS_RetRegist agentname. */
        public agentname: string;

        /**
         * Creates a new GW2RS_RetRegist instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2RS_RetRegist instance
         */
        public static create(properties?: msg.IGW2RS_RetRegist): msg.GW2RS_RetRegist;

        /**
         * Encodes the specified GW2RS_RetRegist message. Does not implicitly {@link msg.GW2RS_RetRegist.verify|verify} messages.
         * @param message GW2RS_RetRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2RS_RetRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2RS_RetRegist message, length delimited. Does not implicitly {@link msg.GW2RS_RetRegist.verify|verify} messages.
         * @param message GW2RS_RetRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2RS_RetRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2RS_RetRegist message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2RS_RetRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2RS_RetRegist;

        /**
         * Decodes a GW2RS_RetRegist message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2RS_RetRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2RS_RetRegist;

        /**
         * Verifies a GW2RS_RetRegist message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2RS_RetRegist message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2RS_RetRegist
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2RS_RetRegist;

        /**
         * Creates a plain object from a GW2RS_RetRegist message. Also converts values to other types if specified.
         * @param message GW2RS_RetRegist
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2RS_RetRegist, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2RS_RetRegist to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2RS_UserDisconnect. */
    interface IGW2RS_UserDisconnect {

        /** GW2RS_UserDisconnect roomid */
        roomid?: (number|Long|null);

        /** GW2RS_UserDisconnect userid */
        userid?: (number|Long|null);
    }

    /** Represents a GW2RS_UserDisconnect. */
    class GW2RS_UserDisconnect implements IGW2RS_UserDisconnect {

        /**
         * Constructs a new GW2RS_UserDisconnect.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2RS_UserDisconnect);

        /** GW2RS_UserDisconnect roomid. */
        public roomid: (number|Long);

        /** GW2RS_UserDisconnect userid. */
        public userid: (number|Long);

        /**
         * Creates a new GW2RS_UserDisconnect instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2RS_UserDisconnect instance
         */
        public static create(properties?: msg.IGW2RS_UserDisconnect): msg.GW2RS_UserDisconnect;

        /**
         * Encodes the specified GW2RS_UserDisconnect message. Does not implicitly {@link msg.GW2RS_UserDisconnect.verify|verify} messages.
         * @param message GW2RS_UserDisconnect message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2RS_UserDisconnect, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2RS_UserDisconnect message, length delimited. Does not implicitly {@link msg.GW2RS_UserDisconnect.verify|verify} messages.
         * @param message GW2RS_UserDisconnect message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2RS_UserDisconnect, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2RS_UserDisconnect message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2RS_UserDisconnect
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2RS_UserDisconnect;

        /**
         * Decodes a GW2RS_UserDisconnect message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2RS_UserDisconnect
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2RS_UserDisconnect;

        /**
         * Verifies a GW2RS_UserDisconnect message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2RS_UserDisconnect message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2RS_UserDisconnect
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2RS_UserDisconnect;

        /**
         * Creates a plain object from a GW2RS_UserDisconnect message. Also converts values to other types if specified.
         * @param message GW2RS_UserDisconnect
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2RS_UserDisconnect, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2RS_UserDisconnect to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RS2GW_RetUserDisconnect. */
    interface IRS2GW_RetUserDisconnect {

        /** RS2GW_RetUserDisconnect roomid */
        roomid?: (number|Long|null);

        /** RS2GW_RetUserDisconnect userid */
        userid?: (number|Long|null);

        /** RS2GW_RetUserDisconnect errcode */
        errcode?: (string|null);
    }

    /** Represents a RS2GW_RetUserDisconnect. */
    class RS2GW_RetUserDisconnect implements IRS2GW_RetUserDisconnect {

        /**
         * Constructs a new RS2GW_RetUserDisconnect.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRS2GW_RetUserDisconnect);

        /** RS2GW_RetUserDisconnect roomid. */
        public roomid: (number|Long);

        /** RS2GW_RetUserDisconnect userid. */
        public userid: (number|Long);

        /** RS2GW_RetUserDisconnect errcode. */
        public errcode: string;

        /**
         * Creates a new RS2GW_RetUserDisconnect instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RS2GW_RetUserDisconnect instance
         */
        public static create(properties?: msg.IRS2GW_RetUserDisconnect): msg.RS2GW_RetUserDisconnect;

        /**
         * Encodes the specified RS2GW_RetUserDisconnect message. Does not implicitly {@link msg.RS2GW_RetUserDisconnect.verify|verify} messages.
         * @param message RS2GW_RetUserDisconnect message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRS2GW_RetUserDisconnect, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified RS2GW_RetUserDisconnect message, length delimited. Does not implicitly {@link msg.RS2GW_RetUserDisconnect.verify|verify} messages.
         * @param message RS2GW_RetUserDisconnect message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRS2GW_RetUserDisconnect, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a RS2GW_RetUserDisconnect message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RS2GW_RetUserDisconnect
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.RS2GW_RetUserDisconnect;

        /**
         * Decodes a RS2GW_RetUserDisconnect message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RS2GW_RetUserDisconnect
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.RS2GW_RetUserDisconnect;

        /**
         * Verifies a RS2GW_RetUserDisconnect message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RS2GW_RetUserDisconnect message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RS2GW_RetUserDisconnect
         */
        public static fromObject(object: { [k: string]: any }): msg.RS2GW_RetUserDisconnect;

        /**
         * Creates a plain object from a RS2GW_RetUserDisconnect message. Also converts values to other types if specified.
         * @param message RS2GW_RetUserDisconnect
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RS2GW_RetUserDisconnect, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RS2GW_RetUserDisconnect to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2RS_MsgTransfer. */
    interface IC2RS_MsgTransfer {

        /** C2RS_MsgTransfer uid */
        uid?: (number|Long|null);

        /** C2RS_MsgTransfer name */
        name?: (string|null);

        /** C2RS_MsgTransfer buf */
        buf?: (Uint8Array|null);
    }

    /** Represents a C2RS_MsgTransfer. */
    class C2RS_MsgTransfer implements IC2RS_MsgTransfer {

        /**
         * Constructs a new C2RS_MsgTransfer.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2RS_MsgTransfer);

        /** C2RS_MsgTransfer uid. */
        public uid: (number|Long);

        /** C2RS_MsgTransfer name. */
        public name: string;

        /** C2RS_MsgTransfer buf. */
        public buf: Uint8Array;

        /**
         * Creates a new C2RS_MsgTransfer instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2RS_MsgTransfer instance
         */
        public static create(properties?: msg.IC2RS_MsgTransfer): msg.C2RS_MsgTransfer;

        /**
         * Encodes the specified C2RS_MsgTransfer message. Does not implicitly {@link msg.C2RS_MsgTransfer.verify|verify} messages.
         * @param message C2RS_MsgTransfer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2RS_MsgTransfer, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2RS_MsgTransfer message, length delimited. Does not implicitly {@link msg.C2RS_MsgTransfer.verify|verify} messages.
         * @param message C2RS_MsgTransfer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2RS_MsgTransfer, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2RS_MsgTransfer message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2RS_MsgTransfer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2RS_MsgTransfer;

        /**
         * Decodes a C2RS_MsgTransfer message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2RS_MsgTransfer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2RS_MsgTransfer;

        /**
         * Verifies a C2RS_MsgTransfer message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2RS_MsgTransfer message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2RS_MsgTransfer
         */
        public static fromObject(object: { [k: string]: any }): msg.C2RS_MsgTransfer;

        /**
         * Creates a plain object from a C2RS_MsgTransfer message. Also converts values to other types if specified.
         * @param message C2RS_MsgTransfer
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2RS_MsgTransfer, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2RS_MsgTransfer to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RS2GW_MsgTransfer. */
    interface IRS2GW_MsgTransfer {

        /** RS2GW_MsgTransfer uid */
        uid?: (number|Long|null);

        /** RS2GW_MsgTransfer name */
        name?: (string|null);

        /** RS2GW_MsgTransfer buf */
        buf?: (Uint8Array|null);
    }

    /** Represents a RS2GW_MsgTransfer. */
    class RS2GW_MsgTransfer implements IRS2GW_MsgTransfer {

        /**
         * Constructs a new RS2GW_MsgTransfer.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRS2GW_MsgTransfer);

        /** RS2GW_MsgTransfer uid. */
        public uid: (number|Long);

        /** RS2GW_MsgTransfer name. */
        public name: string;

        /** RS2GW_MsgTransfer buf. */
        public buf: Uint8Array;

        /**
         * Creates a new RS2GW_MsgTransfer instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RS2GW_MsgTransfer instance
         */
        public static create(properties?: msg.IRS2GW_MsgTransfer): msg.RS2GW_MsgTransfer;

        /**
         * Encodes the specified RS2GW_MsgTransfer message. Does not implicitly {@link msg.RS2GW_MsgTransfer.verify|verify} messages.
         * @param message RS2GW_MsgTransfer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRS2GW_MsgTransfer, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified RS2GW_MsgTransfer message, length delimited. Does not implicitly {@link msg.RS2GW_MsgTransfer.verify|verify} messages.
         * @param message RS2GW_MsgTransfer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRS2GW_MsgTransfer, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a RS2GW_MsgTransfer message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RS2GW_MsgTransfer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.RS2GW_MsgTransfer;

        /**
         * Decodes a RS2GW_MsgTransfer message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RS2GW_MsgTransfer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.RS2GW_MsgTransfer;

        /**
         * Verifies a RS2GW_MsgTransfer message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RS2GW_MsgTransfer message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RS2GW_MsgTransfer
         */
        public static fromObject(object: { [k: string]: any }): msg.RS2GW_MsgTransfer;

        /**
         * Creates a plain object from a RS2GW_MsgTransfer message. Also converts values to other types if specified.
         * @param message RS2GW_MsgTransfer
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RS2GW_MsgTransfer, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RS2GW_MsgTransfer to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RS2MS_ReqRegist. */
    interface IRS2MS_ReqRegist {

        /** RS2MS_ReqRegist account */
        account?: (string|null);

        /** RS2MS_ReqRegist passwd */
        passwd?: (string|null);

        /** RS2MS_ReqRegist name */
        name?: (string|null);
    }

    /** Represents a RS2MS_ReqRegist. */
    class RS2MS_ReqRegist implements IRS2MS_ReqRegist {

        /**
         * Constructs a new RS2MS_ReqRegist.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRS2MS_ReqRegist);

        /** RS2MS_ReqRegist account. */
        public account: string;

        /** RS2MS_ReqRegist passwd. */
        public passwd: string;

        /** RS2MS_ReqRegist name. */
        public name: string;

        /**
         * Creates a new RS2MS_ReqRegist instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RS2MS_ReqRegist instance
         */
        public static create(properties?: msg.IRS2MS_ReqRegist): msg.RS2MS_ReqRegist;

        /**
         * Encodes the specified RS2MS_ReqRegist message. Does not implicitly {@link msg.RS2MS_ReqRegist.verify|verify} messages.
         * @param message RS2MS_ReqRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRS2MS_ReqRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified RS2MS_ReqRegist message, length delimited. Does not implicitly {@link msg.RS2MS_ReqRegist.verify|verify} messages.
         * @param message RS2MS_ReqRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRS2MS_ReqRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a RS2MS_ReqRegist message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RS2MS_ReqRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.RS2MS_ReqRegist;

        /**
         * Decodes a RS2MS_ReqRegist message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RS2MS_ReqRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.RS2MS_ReqRegist;

        /**
         * Verifies a RS2MS_ReqRegist message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RS2MS_ReqRegist message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RS2MS_ReqRegist
         */
        public static fromObject(object: { [k: string]: any }): msg.RS2MS_ReqRegist;

        /**
         * Creates a plain object from a RS2MS_ReqRegist message. Also converts values to other types if specified.
         * @param message RS2MS_ReqRegist
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RS2MS_ReqRegist, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RS2MS_ReqRegist to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MS2RS_RetRegist. */
    interface IMS2RS_RetRegist {

        /** MS2RS_RetRegist errcode */
        errcode?: (string|null);
    }

    /** Represents a MS2RS_RetRegist. */
    class MS2RS_RetRegist implements IMS2RS_RetRegist {

        /**
         * Constructs a new MS2RS_RetRegist.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IMS2RS_RetRegist);

        /** MS2RS_RetRegist errcode. */
        public errcode: string;

        /**
         * Creates a new MS2RS_RetRegist instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MS2RS_RetRegist instance
         */
        public static create(properties?: msg.IMS2RS_RetRegist): msg.MS2RS_RetRegist;

        /**
         * Encodes the specified MS2RS_RetRegist message. Does not implicitly {@link msg.MS2RS_RetRegist.verify|verify} messages.
         * @param message MS2RS_RetRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IMS2RS_RetRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified MS2RS_RetRegist message, length delimited. Does not implicitly {@link msg.MS2RS_RetRegist.verify|verify} messages.
         * @param message MS2RS_RetRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IMS2RS_RetRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a MS2RS_RetRegist message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MS2RS_RetRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.MS2RS_RetRegist;

        /**
         * Decodes a MS2RS_RetRegist message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MS2RS_RetRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.MS2RS_RetRegist;

        /**
         * Verifies a MS2RS_RetRegist message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MS2RS_RetRegist message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MS2RS_RetRegist
         */
        public static fromObject(object: { [k: string]: any }): msg.MS2RS_RetRegist;

        /**
         * Creates a plain object from a MS2RS_RetRegist message. Also converts values to other types if specified.
         * @param message MS2RS_RetRegist
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.MS2RS_RetRegist, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MS2RS_RetRegist to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RS2MS_HeartBeat. */
    interface IRS2MS_HeartBeat {
    }

    /** Represents a RS2MS_HeartBeat. */
    class RS2MS_HeartBeat implements IRS2MS_HeartBeat {

        /**
         * Constructs a new RS2MS_HeartBeat.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRS2MS_HeartBeat);

        /**
         * Creates a new RS2MS_HeartBeat instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RS2MS_HeartBeat instance
         */
        public static create(properties?: msg.IRS2MS_HeartBeat): msg.RS2MS_HeartBeat;

        /**
         * Encodes the specified RS2MS_HeartBeat message. Does not implicitly {@link msg.RS2MS_HeartBeat.verify|verify} messages.
         * @param message RS2MS_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRS2MS_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified RS2MS_HeartBeat message, length delimited. Does not implicitly {@link msg.RS2MS_HeartBeat.verify|verify} messages.
         * @param message RS2MS_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRS2MS_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a RS2MS_HeartBeat message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RS2MS_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.RS2MS_HeartBeat;

        /**
         * Decodes a RS2MS_HeartBeat message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RS2MS_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.RS2MS_HeartBeat;

        /**
         * Verifies a RS2MS_HeartBeat message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RS2MS_HeartBeat message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RS2MS_HeartBeat
         */
        public static fromObject(object: { [k: string]: any }): msg.RS2MS_HeartBeat;

        /**
         * Creates a plain object from a RS2MS_HeartBeat message. Also converts values to other types if specified.
         * @param message RS2MS_HeartBeat
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RS2MS_HeartBeat, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RS2MS_HeartBeat to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MS2RS_HeartBeat. */
    interface IMS2RS_HeartBeat {
    }

    /** Represents a MS2RS_HeartBeat. */
    class MS2RS_HeartBeat implements IMS2RS_HeartBeat {

        /**
         * Constructs a new MS2RS_HeartBeat.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IMS2RS_HeartBeat);

        /**
         * Creates a new MS2RS_HeartBeat instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MS2RS_HeartBeat instance
         */
        public static create(properties?: msg.IMS2RS_HeartBeat): msg.MS2RS_HeartBeat;

        /**
         * Encodes the specified MS2RS_HeartBeat message. Does not implicitly {@link msg.MS2RS_HeartBeat.verify|verify} messages.
         * @param message MS2RS_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IMS2RS_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified MS2RS_HeartBeat message, length delimited. Does not implicitly {@link msg.MS2RS_HeartBeat.verify|verify} messages.
         * @param message MS2RS_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IMS2RS_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a MS2RS_HeartBeat message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MS2RS_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.MS2RS_HeartBeat;

        /**
         * Decodes a MS2RS_HeartBeat message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MS2RS_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.MS2RS_HeartBeat;

        /**
         * Verifies a MS2RS_HeartBeat message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MS2RS_HeartBeat message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MS2RS_HeartBeat
         */
        public static fromObject(object: { [k: string]: any }): msg.MS2RS_HeartBeat;

        /**
         * Creates a plain object from a MS2RS_HeartBeat message. Also converts values to other types if specified.
         * @param message MS2RS_HeartBeat
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.MS2RS_HeartBeat, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MS2RS_HeartBeat to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GateSimpleInfo. */
    interface IGateSimpleInfo {

        /** GateSimpleInfo name */
        name?: (string|null);

        /** GateSimpleInfo host */
        host?: (msg.IIpHost|null);
    }

    /** Represents a GateSimpleInfo. */
    class GateSimpleInfo implements IGateSimpleInfo {

        /**
         * Constructs a new GateSimpleInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGateSimpleInfo);

        /** GateSimpleInfo name. */
        public name: string;

        /** GateSimpleInfo host. */
        public host?: (msg.IIpHost|null);

        /**
         * Creates a new GateSimpleInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GateSimpleInfo instance
         */
        public static create(properties?: msg.IGateSimpleInfo): msg.GateSimpleInfo;

        /**
         * Encodes the specified GateSimpleInfo message. Does not implicitly {@link msg.GateSimpleInfo.verify|verify} messages.
         * @param message GateSimpleInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGateSimpleInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GateSimpleInfo message, length delimited. Does not implicitly {@link msg.GateSimpleInfo.verify|verify} messages.
         * @param message GateSimpleInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGateSimpleInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GateSimpleInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GateSimpleInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GateSimpleInfo;

        /**
         * Decodes a GateSimpleInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GateSimpleInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GateSimpleInfo;

        /**
         * Verifies a GateSimpleInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GateSimpleInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GateSimpleInfo
         */
        public static fromObject(object: { [k: string]: any }): msg.GateSimpleInfo;

        /**
         * Creates a plain object from a GateSimpleInfo message. Also converts values to other types if specified.
         * @param message GateSimpleInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GateSimpleInfo, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GateSimpleInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MS2RS_GateInfo. */
    interface IMS2RS_GateInfo {

        /** MS2RS_GateInfo gates */
        gates?: (msg.IGateSimpleInfo[]|null);
    }

    /** Represents a MS2RS_GateInfo. */
    class MS2RS_GateInfo implements IMS2RS_GateInfo {

        /**
         * Constructs a new MS2RS_GateInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IMS2RS_GateInfo);

        /** MS2RS_GateInfo gates. */
        public gates: msg.IGateSimpleInfo[];

        /**
         * Creates a new MS2RS_GateInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MS2RS_GateInfo instance
         */
        public static create(properties?: msg.IMS2RS_GateInfo): msg.MS2RS_GateInfo;

        /**
         * Encodes the specified MS2RS_GateInfo message. Does not implicitly {@link msg.MS2RS_GateInfo.verify|verify} messages.
         * @param message MS2RS_GateInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IMS2RS_GateInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified MS2RS_GateInfo message, length delimited. Does not implicitly {@link msg.MS2RS_GateInfo.verify|verify} messages.
         * @param message MS2RS_GateInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IMS2RS_GateInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a MS2RS_GateInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MS2RS_GateInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.MS2RS_GateInfo;

        /**
         * Decodes a MS2RS_GateInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MS2RS_GateInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.MS2RS_GateInfo;

        /**
         * Verifies a MS2RS_GateInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MS2RS_GateInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MS2RS_GateInfo
         */
        public static fromObject(object: { [k: string]: any }): msg.MS2RS_GateInfo;

        /**
         * Creates a plain object from a MS2RS_GateInfo message. Also converts values to other types if specified.
         * @param message MS2RS_GateInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.MS2RS_GateInfo, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MS2RS_GateInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MS2Server_BroadCast. */
    interface IMS2Server_BroadCast {

        /** MS2Server_BroadCast cmd */
        cmd?: (string|null);
    }

    /** Represents a MS2Server_BroadCast. */
    class MS2Server_BroadCast implements IMS2Server_BroadCast {

        /**
         * Constructs a new MS2Server_BroadCast.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IMS2Server_BroadCast);

        /** MS2Server_BroadCast cmd. */
        public cmd: string;

        /**
         * Creates a new MS2Server_BroadCast instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MS2Server_BroadCast instance
         */
        public static create(properties?: msg.IMS2Server_BroadCast): msg.MS2Server_BroadCast;

        /**
         * Encodes the specified MS2Server_BroadCast message. Does not implicitly {@link msg.MS2Server_BroadCast.verify|verify} messages.
         * @param message MS2Server_BroadCast message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IMS2Server_BroadCast, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified MS2Server_BroadCast message, length delimited. Does not implicitly {@link msg.MS2Server_BroadCast.verify|verify} messages.
         * @param message MS2Server_BroadCast message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IMS2Server_BroadCast, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a MS2Server_BroadCast message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MS2Server_BroadCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.MS2Server_BroadCast;

        /**
         * Decodes a MS2Server_BroadCast message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MS2Server_BroadCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.MS2Server_BroadCast;

        /**
         * Verifies a MS2Server_BroadCast message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MS2Server_BroadCast message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MS2Server_BroadCast
         */
        public static fromObject(object: { [k: string]: any }): msg.MS2Server_BroadCast;

        /**
         * Creates a plain object from a MS2Server_BroadCast message. Also converts values to other types if specified.
         * @param message MS2Server_BroadCast
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.MS2Server_BroadCast, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MS2Server_BroadCast to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2RS_ReqEnterRoomInfo. */
    interface IC2RS_ReqEnterRoomInfo {

        /** C2RS_ReqEnterRoomInfo id */
        id?: (number|null);

        /** C2RS_ReqEnterRoomInfo password */
        password?: (string|null);
    }

    /** Represents a C2RS_ReqEnterRoomInfo. */
    class C2RS_ReqEnterRoomInfo implements IC2RS_ReqEnterRoomInfo {

        /**
         * Constructs a new C2RS_ReqEnterRoomInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2RS_ReqEnterRoomInfo);

        /** C2RS_ReqEnterRoomInfo id. */
        public id: number;

        /** C2RS_ReqEnterRoomInfo password. */
        public password: string;

        /**
         * Creates a new C2RS_ReqEnterRoomInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2RS_ReqEnterRoomInfo instance
         */
        public static create(properties?: msg.IC2RS_ReqEnterRoomInfo): msg.C2RS_ReqEnterRoomInfo;

        /**
         * Encodes the specified C2RS_ReqEnterRoomInfo message. Does not implicitly {@link msg.C2RS_ReqEnterRoomInfo.verify|verify} messages.
         * @param message C2RS_ReqEnterRoomInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2RS_ReqEnterRoomInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2RS_ReqEnterRoomInfo message, length delimited. Does not implicitly {@link msg.C2RS_ReqEnterRoomInfo.verify|verify} messages.
         * @param message C2RS_ReqEnterRoomInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2RS_ReqEnterRoomInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2RS_ReqEnterRoomInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2RS_ReqEnterRoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2RS_ReqEnterRoomInfo;

        /**
         * Decodes a C2RS_ReqEnterRoomInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2RS_ReqEnterRoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2RS_ReqEnterRoomInfo;

        /**
         * Verifies a C2RS_ReqEnterRoomInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2RS_ReqEnterRoomInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2RS_ReqEnterRoomInfo
         */
        public static fromObject(object: { [k: string]: any }): msg.C2RS_ReqEnterRoomInfo;

        /**
         * Creates a plain object from a C2RS_ReqEnterRoomInfo message. Also converts values to other types if specified.
         * @param message C2RS_ReqEnterRoomInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2RS_ReqEnterRoomInfo, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2RS_ReqEnterRoomInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TexasPlayer. */
    interface ITexasPlayer {

        /** TexasPlayer roleid */
        roleid?: (number|Long|null);

        /** TexasPlayer bankroll */
        bankroll?: (number|null);

        /** TexasPlayer pos */
        pos?: (number|null);

        /** TexasPlayer state */
        state?: (number|null);

        /** TexasPlayer num */
        num?: (number|null);

        /** TexasPlayer initbankroll */
        initbankroll?: (number|null);

        /** TexasPlayer totalnum */
        totalnum?: (number|null);
    }

    /** Represents a TexasPlayer. */
    class TexasPlayer implements ITexasPlayer {

        /**
         * Constructs a new TexasPlayer.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ITexasPlayer);

        /** TexasPlayer roleid. */
        public roleid: (number|Long);

        /** TexasPlayer bankroll. */
        public bankroll: number;

        /** TexasPlayer pos. */
        public pos: number;

        /** TexasPlayer state. */
        public state: number;

        /** TexasPlayer num. */
        public num: number;

        /** TexasPlayer initbankroll. */
        public initbankroll: number;

        /** TexasPlayer totalnum. */
        public totalnum: number;

        /**
         * Creates a new TexasPlayer instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TexasPlayer instance
         */
        public static create(properties?: msg.ITexasPlayer): msg.TexasPlayer;

        /**
         * Encodes the specified TexasPlayer message. Does not implicitly {@link msg.TexasPlayer.verify|verify} messages.
         * @param message TexasPlayer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ITexasPlayer, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TexasPlayer message, length delimited. Does not implicitly {@link msg.TexasPlayer.verify|verify} messages.
         * @param message TexasPlayer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ITexasPlayer, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TexasPlayer message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TexasPlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.TexasPlayer;

        /**
         * Decodes a TexasPlayer message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TexasPlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.TexasPlayer;

        /**
         * Verifies a TexasPlayer message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TexasPlayer message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TexasPlayer
         */
        public static fromObject(object: { [k: string]: any }): msg.TexasPlayer;

        /**
         * Creates a plain object from a TexasPlayer message. Also converts values to other types if specified.
         * @param message TexasPlayer
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.TexasPlayer, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TexasPlayer to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RS2C_RetEnterRoomInfo. */
    interface IRS2C_RetEnterRoomInfo {

        /** RS2C_RetEnterRoomInfo id */
        id?: (number|Long|null);

        /** RS2C_RetEnterRoomInfo buttonpos */
        buttonpos?: (number|null);

        /** RS2C_RetEnterRoomInfo potchips */
        potchips?: (number[]|null);

        /** RS2C_RetEnterRoomInfo roomid */
        roomid?: (number|null);

        /** RS2C_RetEnterRoomInfo ante */
        ante?: (number|null);

        /** RS2C_RetEnterRoomInfo sblind */
        sblind?: (number|null);

        /** RS2C_RetEnterRoomInfo bblind */
        bblind?: (number|null);

        /** RS2C_RetEnterRoomInfo pos */
        pos?: (number|null);

        /** RS2C_RetEnterRoomInfo postime */
        postime?: (number|null);

        /** RS2C_RetEnterRoomInfo starttime */
        starttime?: (number|null);

        /** RS2C_RetEnterRoomInfo publiccard */
        publiccard?: (number[]|null);

        /** RS2C_RetEnterRoomInfo playerlist */
        playerlist?: (msg.ITexasPlayer[]|null);

        /** RS2C_RetEnterRoomInfo isshowcard */
        isshowcard?: (boolean|null);

        /** RS2C_RetEnterRoomInfo handcard */
        handcard?: (number[]|null);

        /** RS2C_RetEnterRoomInfo maxante */
        maxante?: (number|null);

        /** RS2C_RetEnterRoomInfo minraisenum */
        minraisenum?: (number|null);

        /** RS2C_RetEnterRoomInfo masterid */
        masterid?: (number|null);

        /** RS2C_RetEnterRoomInfo blindlevel */
        blindlevel?: (number|null);

        /** RS2C_RetEnterRoomInfo blindtime */
        blindtime?: (number|null);

        /** RS2C_RetEnterRoomInfo rebuytimes */
        rebuytimes?: (number|null);

        /** RS2C_RetEnterRoomInfo addontimes */
        addontimes?: (number|null);

        /** RS2C_RetEnterRoomInfo addbuy */
        addbuy?: (number|null);

        /** RS2C_RetEnterRoomInfo rank */
        rank?: (number|null);

        /** RS2C_RetEnterRoomInfo avgchips */
        avgchips?: (number|null);

        /** RS2C_RetEnterRoomInfo join */
        join?: (number|null);
    }

    /** Represents a RS2C_RetEnterRoomInfo. */
    class RS2C_RetEnterRoomInfo implements IRS2C_RetEnterRoomInfo {

        /**
         * Constructs a new RS2C_RetEnterRoomInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRS2C_RetEnterRoomInfo);

        /** RS2C_RetEnterRoomInfo id. */
        public id: (number|Long);

        /** RS2C_RetEnterRoomInfo buttonpos. */
        public buttonpos: number;

        /** RS2C_RetEnterRoomInfo potchips. */
        public potchips: number[];

        /** RS2C_RetEnterRoomInfo roomid. */
        public roomid: number;

        /** RS2C_RetEnterRoomInfo ante. */
        public ante: number;

        /** RS2C_RetEnterRoomInfo sblind. */
        public sblind: number;

        /** RS2C_RetEnterRoomInfo bblind. */
        public bblind: number;

        /** RS2C_RetEnterRoomInfo pos. */
        public pos: number;

        /** RS2C_RetEnterRoomInfo postime. */
        public postime: number;

        /** RS2C_RetEnterRoomInfo starttime. */
        public starttime: number;

        /** RS2C_RetEnterRoomInfo publiccard. */
        public publiccard: number[];

        /** RS2C_RetEnterRoomInfo playerlist. */
        public playerlist: msg.ITexasPlayer[];

        /** RS2C_RetEnterRoomInfo isshowcard. */
        public isshowcard: boolean;

        /** RS2C_RetEnterRoomInfo handcard. */
        public handcard: number[];

        /** RS2C_RetEnterRoomInfo maxante. */
        public maxante: number;

        /** RS2C_RetEnterRoomInfo minraisenum. */
        public minraisenum: number;

        /** RS2C_RetEnterRoomInfo masterid. */
        public masterid: number;

        /** RS2C_RetEnterRoomInfo blindlevel. */
        public blindlevel: number;

        /** RS2C_RetEnterRoomInfo blindtime. */
        public blindtime: number;

        /** RS2C_RetEnterRoomInfo rebuytimes. */
        public rebuytimes: number;

        /** RS2C_RetEnterRoomInfo addontimes. */
        public addontimes: number;

        /** RS2C_RetEnterRoomInfo addbuy. */
        public addbuy: number;

        /** RS2C_RetEnterRoomInfo rank. */
        public rank: number;

        /** RS2C_RetEnterRoomInfo avgchips. */
        public avgchips: number;

        /** RS2C_RetEnterRoomInfo join. */
        public join: number;

        /**
         * Creates a new RS2C_RetEnterRoomInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RS2C_RetEnterRoomInfo instance
         */
        public static create(properties?: msg.IRS2C_RetEnterRoomInfo): msg.RS2C_RetEnterRoomInfo;

        /**
         * Encodes the specified RS2C_RetEnterRoomInfo message. Does not implicitly {@link msg.RS2C_RetEnterRoomInfo.verify|verify} messages.
         * @param message RS2C_RetEnterRoomInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRS2C_RetEnterRoomInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified RS2C_RetEnterRoomInfo message, length delimited. Does not implicitly {@link msg.RS2C_RetEnterRoomInfo.verify|verify} messages.
         * @param message RS2C_RetEnterRoomInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRS2C_RetEnterRoomInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a RS2C_RetEnterRoomInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RS2C_RetEnterRoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.RS2C_RetEnterRoomInfo;

        /**
         * Decodes a RS2C_RetEnterRoomInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RS2C_RetEnterRoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.RS2C_RetEnterRoomInfo;

        /**
         * Verifies a RS2C_RetEnterRoomInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RS2C_RetEnterRoomInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RS2C_RetEnterRoomInfo
         */
        public static fromObject(object: { [k: string]: any }): msg.RS2C_RetEnterRoomInfo;

        /**
         * Creates a plain object from a RS2C_RetEnterRoomInfo message. Also converts values to other types if specified.
         * @param message RS2C_RetEnterRoomInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RS2C_RetEnterRoomInfo, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RS2C_RetEnterRoomInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2RS_ReqNextRound. */
    interface IC2RS_ReqNextRound {
    }

    /** Represents a C2RS_ReqNextRound. */
    class C2RS_ReqNextRound implements IC2RS_ReqNextRound {

        /**
         * Constructs a new C2RS_ReqNextRound.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2RS_ReqNextRound);

        /**
         * Creates a new C2RS_ReqNextRound instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2RS_ReqNextRound instance
         */
        public static create(properties?: msg.IC2RS_ReqNextRound): msg.C2RS_ReqNextRound;

        /**
         * Encodes the specified C2RS_ReqNextRound message. Does not implicitly {@link msg.C2RS_ReqNextRound.verify|verify} messages.
         * @param message C2RS_ReqNextRound message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2RS_ReqNextRound, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2RS_ReqNextRound message, length delimited. Does not implicitly {@link msg.C2RS_ReqNextRound.verify|verify} messages.
         * @param message C2RS_ReqNextRound message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2RS_ReqNextRound, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2RS_ReqNextRound message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2RS_ReqNextRound
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2RS_ReqNextRound;

        /**
         * Decodes a C2RS_ReqNextRound message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2RS_ReqNextRound
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2RS_ReqNextRound;

        /**
         * Verifies a C2RS_ReqNextRound message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2RS_ReqNextRound message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2RS_ReqNextRound
         */
        public static fromObject(object: { [k: string]: any }): msg.C2RS_ReqNextRound;

        /**
         * Creates a plain object from a C2RS_ReqNextRound message. Also converts values to other types if specified.
         * @param message C2RS_ReqNextRound
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2RS_ReqNextRound, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2RS_ReqNextRound to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RS2C_RetNextRound. */
    interface IRS2C_RetNextRound {
    }

    /** Represents a RS2C_RetNextRound. */
    class RS2C_RetNextRound implements IRS2C_RetNextRound {

        /**
         * Constructs a new RS2C_RetNextRound.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRS2C_RetNextRound);

        /**
         * Creates a new RS2C_RetNextRound instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RS2C_RetNextRound instance
         */
        public static create(properties?: msg.IRS2C_RetNextRound): msg.RS2C_RetNextRound;

        /**
         * Encodes the specified RS2C_RetNextRound message. Does not implicitly {@link msg.RS2C_RetNextRound.verify|verify} messages.
         * @param message RS2C_RetNextRound message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRS2C_RetNextRound, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified RS2C_RetNextRound message, length delimited. Does not implicitly {@link msg.RS2C_RetNextRound.verify|verify} messages.
         * @param message RS2C_RetNextRound message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRS2C_RetNextRound, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a RS2C_RetNextRound message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RS2C_RetNextRound
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.RS2C_RetNextRound;

        /**
         * Decodes a RS2C_RetNextRound message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RS2C_RetNextRound
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.RS2C_RetNextRound;

        /**
         * Verifies a RS2C_RetNextRound message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RS2C_RetNextRound message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RS2C_RetNextRound
         */
        public static fromObject(object: { [k: string]: any }): msg.RS2C_RetNextRound;

        /**
         * Creates a plain object from a RS2C_RetNextRound message. Also converts values to other types if specified.
         * @param message RS2C_RetNextRound
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RS2C_RetNextRound, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RS2C_RetNextRound to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2RS_ReqAction. */
    interface IC2RS_ReqAction {

        /** C2RS_ReqAction state */
        state?: (number|null);

        /** C2RS_ReqAction num */
        num?: (number|null);
    }

    /** Represents a C2RS_ReqAction. */
    class C2RS_ReqAction implements IC2RS_ReqAction {

        /**
         * Constructs a new C2RS_ReqAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2RS_ReqAction);

        /** C2RS_ReqAction state. */
        public state: number;

        /** C2RS_ReqAction num. */
        public num: number;

        /**
         * Creates a new C2RS_ReqAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2RS_ReqAction instance
         */
        public static create(properties?: msg.IC2RS_ReqAction): msg.C2RS_ReqAction;

        /**
         * Encodes the specified C2RS_ReqAction message. Does not implicitly {@link msg.C2RS_ReqAction.verify|verify} messages.
         * @param message C2RS_ReqAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2RS_ReqAction, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2RS_ReqAction message, length delimited. Does not implicitly {@link msg.C2RS_ReqAction.verify|verify} messages.
         * @param message C2RS_ReqAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2RS_ReqAction, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2RS_ReqAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2RS_ReqAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2RS_ReqAction;

        /**
         * Decodes a C2RS_ReqAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2RS_ReqAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2RS_ReqAction;

        /**
         * Verifies a C2RS_ReqAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2RS_ReqAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2RS_ReqAction
         */
        public static fromObject(object: { [k: string]: any }): msg.C2RS_ReqAction;

        /**
         * Creates a plain object from a C2RS_ReqAction message. Also converts values to other types if specified.
         * @param message C2RS_ReqAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2RS_ReqAction, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2RS_ReqAction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RS2C_RetAction. */
    interface IRS2C_RetAction {
    }

    /** Represents a RS2C_RetAction. */
    class RS2C_RetAction implements IRS2C_RetAction {

        /**
         * Constructs a new RS2C_RetAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRS2C_RetAction);

        /**
         * Creates a new RS2C_RetAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RS2C_RetAction instance
         */
        public static create(properties?: msg.IRS2C_RetAction): msg.RS2C_RetAction;

        /**
         * Encodes the specified RS2C_RetAction message. Does not implicitly {@link msg.RS2C_RetAction.verify|verify} messages.
         * @param message RS2C_RetAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRS2C_RetAction, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified RS2C_RetAction message, length delimited. Does not implicitly {@link msg.RS2C_RetAction.verify|verify} messages.
         * @param message RS2C_RetAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRS2C_RetAction, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a RS2C_RetAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RS2C_RetAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.RS2C_RetAction;

        /**
         * Decodes a RS2C_RetAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RS2C_RetAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.RS2C_RetAction;

        /**
         * Verifies a RS2C_RetAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RS2C_RetAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RS2C_RetAction
         */
        public static fromObject(object: { [k: string]: any }): msg.RS2C_RetAction;

        /**
         * Creates a plain object from a RS2C_RetAction message. Also converts values to other types if specified.
         * @param message RS2C_RetAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RS2C_RetAction, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RS2C_RetAction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2RS_ReqLeaveRoom. */
    interface IC2RS_ReqLeaveRoom {
    }

    /** Represents a C2RS_ReqLeaveRoom. */
    class C2RS_ReqLeaveRoom implements IC2RS_ReqLeaveRoom {

        /**
         * Constructs a new C2RS_ReqLeaveRoom.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2RS_ReqLeaveRoom);

        /**
         * Creates a new C2RS_ReqLeaveRoom instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2RS_ReqLeaveRoom instance
         */
        public static create(properties?: msg.IC2RS_ReqLeaveRoom): msg.C2RS_ReqLeaveRoom;

        /**
         * Encodes the specified C2RS_ReqLeaveRoom message. Does not implicitly {@link msg.C2RS_ReqLeaveRoom.verify|verify} messages.
         * @param message C2RS_ReqLeaveRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2RS_ReqLeaveRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2RS_ReqLeaveRoom message, length delimited. Does not implicitly {@link msg.C2RS_ReqLeaveRoom.verify|verify} messages.
         * @param message C2RS_ReqLeaveRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2RS_ReqLeaveRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2RS_ReqLeaveRoom message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2RS_ReqLeaveRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2RS_ReqLeaveRoom;

        /**
         * Decodes a C2RS_ReqLeaveRoom message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2RS_ReqLeaveRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2RS_ReqLeaveRoom;

        /**
         * Verifies a C2RS_ReqLeaveRoom message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2RS_ReqLeaveRoom message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2RS_ReqLeaveRoom
         */
        public static fromObject(object: { [k: string]: any }): msg.C2RS_ReqLeaveRoom;

        /**
         * Creates a plain object from a C2RS_ReqLeaveRoom message. Also converts values to other types if specified.
         * @param message C2RS_ReqLeaveRoom
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2RS_ReqLeaveRoom, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2RS_ReqLeaveRoom to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RS2C_RetLeaveRoom. */
    interface IRS2C_RetLeaveRoom {
    }

    /** Represents a RS2C_RetLeaveRoom. */
    class RS2C_RetLeaveRoom implements IRS2C_RetLeaveRoom {

        /**
         * Constructs a new RS2C_RetLeaveRoom.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRS2C_RetLeaveRoom);

        /**
         * Creates a new RS2C_RetLeaveRoom instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RS2C_RetLeaveRoom instance
         */
        public static create(properties?: msg.IRS2C_RetLeaveRoom): msg.RS2C_RetLeaveRoom;

        /**
         * Encodes the specified RS2C_RetLeaveRoom message. Does not implicitly {@link msg.RS2C_RetLeaveRoom.verify|verify} messages.
         * @param message RS2C_RetLeaveRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRS2C_RetLeaveRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified RS2C_RetLeaveRoom message, length delimited. Does not implicitly {@link msg.RS2C_RetLeaveRoom.verify|verify} messages.
         * @param message RS2C_RetLeaveRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRS2C_RetLeaveRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a RS2C_RetLeaveRoom message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RS2C_RetLeaveRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.RS2C_RetLeaveRoom;

        /**
         * Decodes a RS2C_RetLeaveRoom message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RS2C_RetLeaveRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.RS2C_RetLeaveRoom;

        /**
         * Verifies a RS2C_RetLeaveRoom message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RS2C_RetLeaveRoom message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RS2C_RetLeaveRoom
         */
        public static fromObject(object: { [k: string]: any }): msg.RS2C_RetLeaveRoom;

        /**
         * Creates a plain object from a RS2C_RetLeaveRoom message. Also converts values to other types if specified.
         * @param message RS2C_RetLeaveRoom
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RS2C_RetLeaveRoom, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RS2C_RetLeaveRoom to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2RS_ReqBuyInGame. */
    interface IC2RS_ReqBuyInGame {
    }

    /** Represents a C2RS_ReqBuyInGame. */
    class C2RS_ReqBuyInGame implements IC2RS_ReqBuyInGame {

        /**
         * Constructs a new C2RS_ReqBuyInGame.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2RS_ReqBuyInGame);

        /**
         * Creates a new C2RS_ReqBuyInGame instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2RS_ReqBuyInGame instance
         */
        public static create(properties?: msg.IC2RS_ReqBuyInGame): msg.C2RS_ReqBuyInGame;

        /**
         * Encodes the specified C2RS_ReqBuyInGame message. Does not implicitly {@link msg.C2RS_ReqBuyInGame.verify|verify} messages.
         * @param message C2RS_ReqBuyInGame message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2RS_ReqBuyInGame, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2RS_ReqBuyInGame message, length delimited. Does not implicitly {@link msg.C2RS_ReqBuyInGame.verify|verify} messages.
         * @param message C2RS_ReqBuyInGame message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2RS_ReqBuyInGame, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2RS_ReqBuyInGame message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2RS_ReqBuyInGame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2RS_ReqBuyInGame;

        /**
         * Decodes a C2RS_ReqBuyInGame message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2RS_ReqBuyInGame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2RS_ReqBuyInGame;

        /**
         * Verifies a C2RS_ReqBuyInGame message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2RS_ReqBuyInGame message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2RS_ReqBuyInGame
         */
        public static fromObject(object: { [k: string]: any }): msg.C2RS_ReqBuyInGame;

        /**
         * Creates a plain object from a C2RS_ReqBuyInGame message. Also converts values to other types if specified.
         * @param message C2RS_ReqBuyInGame
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2RS_ReqBuyInGame, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2RS_ReqBuyInGame to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RS2C_RetBuyInGame. */
    interface IRS2C_RetBuyInGame {

        /** RS2C_RetBuyInGame num */
        num?: (number|null);

        /** RS2C_RetBuyInGame isAutoBuy */
        isAutoBuy?: (boolean|null);

        /** RS2C_RetBuyInGame pos */
        pos?: (number|null);
    }

    /** Represents a RS2C_RetBuyInGame. */
    class RS2C_RetBuyInGame implements IRS2C_RetBuyInGame {

        /**
         * Constructs a new RS2C_RetBuyInGame.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRS2C_RetBuyInGame);

        /** RS2C_RetBuyInGame num. */
        public num: number;

        /** RS2C_RetBuyInGame isAutoBuy. */
        public isAutoBuy: boolean;

        /** RS2C_RetBuyInGame pos. */
        public pos: number;

        /**
         * Creates a new RS2C_RetBuyInGame instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RS2C_RetBuyInGame instance
         */
        public static create(properties?: msg.IRS2C_RetBuyInGame): msg.RS2C_RetBuyInGame;

        /**
         * Encodes the specified RS2C_RetBuyInGame message. Does not implicitly {@link msg.RS2C_RetBuyInGame.verify|verify} messages.
         * @param message RS2C_RetBuyInGame message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRS2C_RetBuyInGame, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified RS2C_RetBuyInGame message, length delimited. Does not implicitly {@link msg.RS2C_RetBuyInGame.verify|verify} messages.
         * @param message RS2C_RetBuyInGame message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRS2C_RetBuyInGame, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a RS2C_RetBuyInGame message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RS2C_RetBuyInGame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.RS2C_RetBuyInGame;

        /**
         * Decodes a RS2C_RetBuyInGame message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RS2C_RetBuyInGame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.RS2C_RetBuyInGame;

        /**
         * Verifies a RS2C_RetBuyInGame message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RS2C_RetBuyInGame message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RS2C_RetBuyInGame
         */
        public static fromObject(object: { [k: string]: any }): msg.RS2C_RetBuyInGame;

        /**
         * Creates a plain object from a RS2C_RetBuyInGame message. Also converts values to other types if specified.
         * @param message RS2C_RetBuyInGame
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RS2C_RetBuyInGame, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RS2C_RetBuyInGame to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2RS_ReqStandUp. */
    interface IC2RS_ReqStandUp {
    }

    /** Represents a C2RS_ReqStandUp. */
    class C2RS_ReqStandUp implements IC2RS_ReqStandUp {

        /**
         * Constructs a new C2RS_ReqStandUp.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2RS_ReqStandUp);

        /**
         * Creates a new C2RS_ReqStandUp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2RS_ReqStandUp instance
         */
        public static create(properties?: msg.IC2RS_ReqStandUp): msg.C2RS_ReqStandUp;

        /**
         * Encodes the specified C2RS_ReqStandUp message. Does not implicitly {@link msg.C2RS_ReqStandUp.verify|verify} messages.
         * @param message C2RS_ReqStandUp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2RS_ReqStandUp, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2RS_ReqStandUp message, length delimited. Does not implicitly {@link msg.C2RS_ReqStandUp.verify|verify} messages.
         * @param message C2RS_ReqStandUp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2RS_ReqStandUp, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2RS_ReqStandUp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2RS_ReqStandUp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2RS_ReqStandUp;

        /**
         * Decodes a C2RS_ReqStandUp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2RS_ReqStandUp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2RS_ReqStandUp;

        /**
         * Verifies a C2RS_ReqStandUp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2RS_ReqStandUp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2RS_ReqStandUp
         */
        public static fromObject(object: { [k: string]: any }): msg.C2RS_ReqStandUp;

        /**
         * Creates a plain object from a C2RS_ReqStandUp message. Also converts values to other types if specified.
         * @param message C2RS_ReqStandUp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2RS_ReqStandUp, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2RS_ReqStandUp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RS2C_RetStandUp. */
    interface IRS2C_RetStandUp {
    }

    /** Represents a RS2C_RetStandUp. */
    class RS2C_RetStandUp implements IRS2C_RetStandUp {

        /**
         * Constructs a new RS2C_RetStandUp.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRS2C_RetStandUp);

        /**
         * Creates a new RS2C_RetStandUp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RS2C_RetStandUp instance
         */
        public static create(properties?: msg.IRS2C_RetStandUp): msg.RS2C_RetStandUp;

        /**
         * Encodes the specified RS2C_RetStandUp message. Does not implicitly {@link msg.RS2C_RetStandUp.verify|verify} messages.
         * @param message RS2C_RetStandUp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRS2C_RetStandUp, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified RS2C_RetStandUp message, length delimited. Does not implicitly {@link msg.RS2C_RetStandUp.verify|verify} messages.
         * @param message RS2C_RetStandUp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRS2C_RetStandUp, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a RS2C_RetStandUp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RS2C_RetStandUp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.RS2C_RetStandUp;

        /**
         * Decodes a RS2C_RetStandUp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RS2C_RetStandUp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.RS2C_RetStandUp;

        /**
         * Verifies a RS2C_RetStandUp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RS2C_RetStandUp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RS2C_RetStandUp
         */
        public static fromObject(object: { [k: string]: any }): msg.RS2C_RetStandUp;

        /**
         * Creates a plain object from a RS2C_RetStandUp message. Also converts values to other types if specified.
         * @param message RS2C_RetStandUp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RS2C_RetStandUp, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RS2C_RetStandUp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2RS_ReqBrightCard. */
    interface IC2RS_ReqBrightCard {
    }

    /** Represents a C2RS_ReqBrightCard. */
    class C2RS_ReqBrightCard implements IC2RS_ReqBrightCard {

        /**
         * Constructs a new C2RS_ReqBrightCard.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2RS_ReqBrightCard);

        /**
         * Creates a new C2RS_ReqBrightCard instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2RS_ReqBrightCard instance
         */
        public static create(properties?: msg.IC2RS_ReqBrightCard): msg.C2RS_ReqBrightCard;

        /**
         * Encodes the specified C2RS_ReqBrightCard message. Does not implicitly {@link msg.C2RS_ReqBrightCard.verify|verify} messages.
         * @param message C2RS_ReqBrightCard message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2RS_ReqBrightCard, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2RS_ReqBrightCard message, length delimited. Does not implicitly {@link msg.C2RS_ReqBrightCard.verify|verify} messages.
         * @param message C2RS_ReqBrightCard message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2RS_ReqBrightCard, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2RS_ReqBrightCard message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2RS_ReqBrightCard
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2RS_ReqBrightCard;

        /**
         * Decodes a C2RS_ReqBrightCard message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2RS_ReqBrightCard
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2RS_ReqBrightCard;

        /**
         * Verifies a C2RS_ReqBrightCard message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2RS_ReqBrightCard message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2RS_ReqBrightCard
         */
        public static fromObject(object: { [k: string]: any }): msg.C2RS_ReqBrightCard;

        /**
         * Creates a plain object from a C2RS_ReqBrightCard message. Also converts values to other types if specified.
         * @param message C2RS_ReqBrightCard
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2RS_ReqBrightCard, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2RS_ReqBrightCard to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RS2C_RetBrightCard. */
    interface IRS2C_RetBrightCard {
    }

    /** Represents a RS2C_RetBrightCard. */
    class RS2C_RetBrightCard implements IRS2C_RetBrightCard {

        /**
         * Constructs a new RS2C_RetBrightCard.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRS2C_RetBrightCard);

        /**
         * Creates a new RS2C_RetBrightCard instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RS2C_RetBrightCard instance
         */
        public static create(properties?: msg.IRS2C_RetBrightCard): msg.RS2C_RetBrightCard;

        /**
         * Encodes the specified RS2C_RetBrightCard message. Does not implicitly {@link msg.RS2C_RetBrightCard.verify|verify} messages.
         * @param message RS2C_RetBrightCard message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRS2C_RetBrightCard, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified RS2C_RetBrightCard message, length delimited. Does not implicitly {@link msg.RS2C_RetBrightCard.verify|verify} messages.
         * @param message RS2C_RetBrightCard message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRS2C_RetBrightCard, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a RS2C_RetBrightCard message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RS2C_RetBrightCard
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.RS2C_RetBrightCard;

        /**
         * Decodes a RS2C_RetBrightCard message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RS2C_RetBrightCard
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.RS2C_RetBrightCard;

        /**
         * Verifies a RS2C_RetBrightCard message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RS2C_RetBrightCard message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RS2C_RetBrightCard
         */
        public static fromObject(object: { [k: string]: any }): msg.RS2C_RetBrightCard;

        /**
         * Creates a plain object from a RS2C_RetBrightCard message. Also converts values to other types if specified.
         * @param message RS2C_RetBrightCard
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RS2C_RetBrightCard, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RS2C_RetBrightCard to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2RS_ReqAddCoin. */
    interface IC2RS_ReqAddCoin {

        /** C2RS_ReqAddCoin num */
        num?: (number|null);
    }

    /** Represents a C2RS_ReqAddCoin. */
    class C2RS_ReqAddCoin implements IC2RS_ReqAddCoin {

        /**
         * Constructs a new C2RS_ReqAddCoin.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2RS_ReqAddCoin);

        /** C2RS_ReqAddCoin num. */
        public num: number;

        /**
         * Creates a new C2RS_ReqAddCoin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2RS_ReqAddCoin instance
         */
        public static create(properties?: msg.IC2RS_ReqAddCoin): msg.C2RS_ReqAddCoin;

        /**
         * Encodes the specified C2RS_ReqAddCoin message. Does not implicitly {@link msg.C2RS_ReqAddCoin.verify|verify} messages.
         * @param message C2RS_ReqAddCoin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2RS_ReqAddCoin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2RS_ReqAddCoin message, length delimited. Does not implicitly {@link msg.C2RS_ReqAddCoin.verify|verify} messages.
         * @param message C2RS_ReqAddCoin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2RS_ReqAddCoin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2RS_ReqAddCoin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2RS_ReqAddCoin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2RS_ReqAddCoin;

        /**
         * Decodes a C2RS_ReqAddCoin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2RS_ReqAddCoin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2RS_ReqAddCoin;

        /**
         * Verifies a C2RS_ReqAddCoin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2RS_ReqAddCoin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2RS_ReqAddCoin
         */
        public static fromObject(object: { [k: string]: any }): msg.C2RS_ReqAddCoin;

        /**
         * Creates a plain object from a C2RS_ReqAddCoin message. Also converts values to other types if specified.
         * @param message C2RS_ReqAddCoin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2RS_ReqAddCoin, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2RS_ReqAddCoin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RS2C_RetAddCoin. */
    interface IRS2C_RetAddCoin {
    }

    /** Represents a RS2C_RetAddCoin. */
    class RS2C_RetAddCoin implements IRS2C_RetAddCoin {

        /**
         * Constructs a new RS2C_RetAddCoin.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRS2C_RetAddCoin);

        /**
         * Creates a new RS2C_RetAddCoin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RS2C_RetAddCoin instance
         */
        public static create(properties?: msg.IRS2C_RetAddCoin): msg.RS2C_RetAddCoin;

        /**
         * Encodes the specified RS2C_RetAddCoin message. Does not implicitly {@link msg.RS2C_RetAddCoin.verify|verify} messages.
         * @param message RS2C_RetAddCoin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRS2C_RetAddCoin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified RS2C_RetAddCoin message, length delimited. Does not implicitly {@link msg.RS2C_RetAddCoin.verify|verify} messages.
         * @param message RS2C_RetAddCoin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRS2C_RetAddCoin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a RS2C_RetAddCoin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RS2C_RetAddCoin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.RS2C_RetAddCoin;

        /**
         * Decodes a RS2C_RetAddCoin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RS2C_RetAddCoin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.RS2C_RetAddCoin;

        /**
         * Verifies a RS2C_RetAddCoin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RS2C_RetAddCoin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RS2C_RetAddCoin
         */
        public static fromObject(object: { [k: string]: any }): msg.RS2C_RetAddCoin;

        /**
         * Creates a plain object from a RS2C_RetAddCoin message. Also converts values to other types if specified.
         * @param message RS2C_RetAddCoin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RS2C_RetAddCoin, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RS2C_RetAddCoin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** 牌局模式 */
    enum GamblingPattern {
        _Fast = 1,
        _Ante = 2,
        _NoUpperLimit = 3,
        _Personal = 4,
        _AllIn = 5
    }

    /** 房间场次类型 对应room.json里面的type */
    enum PlayingFieldType {
        Primary = 1,
        Middle = 2,
        High = 3,
        OmahaPrimary = 4,
        OmahaMiddle = 5,
        OmahaHigh = 6,
        PlayFieldPersonal = 11,
        OmahaPersonal = 12,
        Mtt = 21,
        Sng = 22,
        Guide = 31,
        GuidePlayWay = 32
    }

    /** 牌型 */
    enum CardType {
        None = 0,
        HighCard = 1,
        OnePair = 2,
        TwoPairs = 3,
        ThreeOfAKind = 4,
        Straight = 5,
        Flush = 6,
        Fullhouse = 7,
        FourOfAKind = 8,
        StraightFlush = 9,
        RoyalFlush = 10
    }

    /** 花色枚举 */
    enum FlushType {
        Diamonds = 1,
        Hearts = 2,
        Spades = 3,
        Clubs = 4
    }

    /** 破产购买枚举 */
    enum GoBrokeBuyType {
        GoldScale = 2
    }

    /** 牌局面板显示状态 */
    enum GamblingPanelStateIndex {
        _Null = 0,
        _Normal = 1,
        _MatchWait = 2,
        _Match = 3,
        _Guide = 4,
        _GuidePlayWay = 5,
        _Omaha = 8
    }

    /** 买入游戏状态 */
    enum BuyInGameState {
        Sit = 1,
        Stand = 2
    }

    /** 座位模式 */
    enum SeatMode {
        Three = 3,
        Five = 5,
        Six = 6,
        Nine = 9
    }

    /** 筹码显示状态 */
    enum ChipsShowState {
        Left = 1,
        Right = 2,
        LeftDown = 3,
        RightDown = 4,
        Top = 5
    }

    /** 插槽层级类型 */
    enum SlotLayerType {
        _None = 0,
        _Down = 1,
        _Up = 2
    }

    /** 玩家状态 */
    enum PlayerState {
        WaitNext = 0,
        Fold = 1,
        Check = 2,
        Raise = 3,
        AllIn = 4,
        Call = 5,
        Blind = 6,
        WaitAction = 7,
        Trusteeship = 8,
        RoomId = 20,
        ThePos = 21,
        ButtonPos = 22,
        HandCard = 23,
        SetPos = 24,
        PubCard = 25,
        PoolWon = 26,
        ShowCard = 27,
        StandUp = 28,
        Action = 100,
        Empty = 104
    }

    /** 上局回顾玩家位置类型 */
    enum PlayerPosType {
        Sblind = 1,
        Bblind = 2,
        Banker = 3
    }

    /** 玩法类型枚举 */
    enum PlayWayType {
        PlayField = 1,
        Omaha = 2
    }
}

/** Namespace table. */
declare namespace table {

    /** Properties of a TBallGiftbase. */
    interface ITBallGiftbase {

        /** TBallGiftbase TBallGift */
        TBallGift?: (table.ITBallGiftDefine[]|null);
    }

    /** Represents a TBallGiftbase. */
    class TBallGiftbase implements ITBallGiftbase {

        /**
         * Constructs a new TBallGiftbase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITBallGiftbase);

        /** TBallGiftbase TBallGift. */
        public TBallGift: table.ITBallGiftDefine[];

        /**
         * Creates a new TBallGiftbase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TBallGiftbase instance
         */
        public static create(properties?: table.ITBallGiftbase): table.TBallGiftbase;

        /**
         * Encodes the specified TBallGiftbase message. Does not implicitly {@link table.TBallGiftbase.verify|verify} messages.
         * @param message TBallGiftbase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITBallGiftbase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TBallGiftbase message, length delimited. Does not implicitly {@link table.TBallGiftbase.verify|verify} messages.
         * @param message TBallGiftbase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITBallGiftbase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TBallGiftbase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TBallGiftbase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TBallGiftbase;

        /**
         * Decodes a TBallGiftbase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TBallGiftbase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TBallGiftbase;

        /**
         * Verifies a TBallGiftbase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TBallGiftbase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TBallGiftbase
         */
        public static fromObject(object: { [k: string]: any }): table.TBallGiftbase;

        /**
         * Creates a plain object from a TBallGiftbase message. Also converts values to other types if specified.
         * @param message TBallGiftbase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TBallGiftbase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TBallGiftbase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TBallGiftDefine. */
    interface ITBallGiftDefine {

        /** TBallGiftDefine Id */
        Id?: (number|null);

        /** TBallGiftDefine Name */
        Name?: (string|null);

        /** TBallGiftDefine Num */
        Num?: (number|null);

        /** TBallGiftDefine ItemId */
        ItemId?: (number|null);

        /** TBallGiftDefine Path */
        Path?: (string|null);

        /** TBallGiftDefine Pro */
        Pro?: (number|null);

        /** TBallGiftDefine PushBag */
        PushBag?: (number|null);

        /** TBallGiftDefine Cost */
        Cost?: (number|null);
    }

    /** Represents a TBallGiftDefine. */
    class TBallGiftDefine implements ITBallGiftDefine {

        /**
         * Constructs a new TBallGiftDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITBallGiftDefine);

        /** TBallGiftDefine Id. */
        public Id: number;

        /** TBallGiftDefine Name. */
        public Name: string;

        /** TBallGiftDefine Num. */
        public Num: number;

        /** TBallGiftDefine ItemId. */
        public ItemId: number;

        /** TBallGiftDefine Path. */
        public Path: string;

        /** TBallGiftDefine Pro. */
        public Pro: number;

        /** TBallGiftDefine PushBag. */
        public PushBag: number;

        /** TBallGiftDefine Cost. */
        public Cost: number;

        /**
         * Creates a new TBallGiftDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TBallGiftDefine instance
         */
        public static create(properties?: table.ITBallGiftDefine): table.TBallGiftDefine;

        /**
         * Encodes the specified TBallGiftDefine message. Does not implicitly {@link table.TBallGiftDefine.verify|verify} messages.
         * @param message TBallGiftDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITBallGiftDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TBallGiftDefine message, length delimited. Does not implicitly {@link table.TBallGiftDefine.verify|verify} messages.
         * @param message TBallGiftDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITBallGiftDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TBallGiftDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TBallGiftDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TBallGiftDefine;

        /**
         * Decodes a TBallGiftDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TBallGiftDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TBallGiftDefine;

        /**
         * Verifies a TBallGiftDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TBallGiftDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TBallGiftDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TBallGiftDefine;

        /**
         * Creates a plain object from a TBallGiftDefine message. Also converts values to other types if specified.
         * @param message TBallGiftDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TBallGiftDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TBallGiftDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GiftProBase. */
    interface IGiftProBase {

        /** GiftProBase TGiftPro */
        TGiftPro?: (table.ITGiftProDefine[]|null);
    }

    /** Represents a GiftProBase. */
    class GiftProBase implements IGiftProBase {

        /**
         * Constructs a new GiftProBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.IGiftProBase);

        /** GiftProBase TGiftPro. */
        public TGiftPro: table.ITGiftProDefine[];

        /**
         * Creates a new GiftProBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GiftProBase instance
         */
        public static create(properties?: table.IGiftProBase): table.GiftProBase;

        /**
         * Encodes the specified GiftProBase message. Does not implicitly {@link table.GiftProBase.verify|verify} messages.
         * @param message GiftProBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.IGiftProBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GiftProBase message, length delimited. Does not implicitly {@link table.GiftProBase.verify|verify} messages.
         * @param message GiftProBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.IGiftProBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GiftProBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GiftProBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.GiftProBase;

        /**
         * Decodes a GiftProBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GiftProBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.GiftProBase;

        /**
         * Verifies a GiftProBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GiftProBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GiftProBase
         */
        public static fromObject(object: { [k: string]: any }): table.GiftProBase;

        /**
         * Creates a plain object from a GiftProBase message. Also converts values to other types if specified.
         * @param message GiftProBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.GiftProBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GiftProBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TGiftProDefine. */
    interface ITGiftProDefine {

        /** TGiftProDefine Id */
        Id?: (number|null);

        /** TGiftProDefine Limitmin */
        Limitmin?: (number|null);

        /** TGiftProDefine Limitmax */
        Limitmax?: (number|null);

        /** TGiftProDefine Pro */
        Pro?: (string[]|null);
    }

    /** Represents a TGiftProDefine. */
    class TGiftProDefine implements ITGiftProDefine {

        /**
         * Constructs a new TGiftProDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITGiftProDefine);

        /** TGiftProDefine Id. */
        public Id: number;

        /** TGiftProDefine Limitmin. */
        public Limitmin: number;

        /** TGiftProDefine Limitmax. */
        public Limitmax: number;

        /** TGiftProDefine Pro. */
        public Pro: string[];

        /**
         * Creates a new TGiftProDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TGiftProDefine instance
         */
        public static create(properties?: table.ITGiftProDefine): table.TGiftProDefine;

        /**
         * Encodes the specified TGiftProDefine message. Does not implicitly {@link table.TGiftProDefine.verify|verify} messages.
         * @param message TGiftProDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITGiftProDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TGiftProDefine message, length delimited. Does not implicitly {@link table.TGiftProDefine.verify|verify} messages.
         * @param message TGiftProDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITGiftProDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TGiftProDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TGiftProDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TGiftProDefine;

        /**
         * Decodes a TGiftProDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TGiftProDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TGiftProDefine;

        /**
         * Verifies a TGiftProDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TGiftProDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TGiftProDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TGiftProDefine;

        /**
         * Creates a plain object from a TGiftProDefine message. Also converts values to other types if specified.
         * @param message TGiftProDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TGiftProDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TGiftProDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ItemBase. */
    interface IItemBase {

        /** ItemBase ItemBaseData */
        ItemBaseData?: (table.IItemBaseDataDefine[]|null);
    }

    /** Represents an ItemBase. */
    class ItemBase implements IItemBase {

        /**
         * Constructs a new ItemBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.IItemBase);

        /** ItemBase ItemBaseData. */
        public ItemBaseData: table.IItemBaseDataDefine[];

        /**
         * Creates a new ItemBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ItemBase instance
         */
        public static create(properties?: table.IItemBase): table.ItemBase;

        /**
         * Encodes the specified ItemBase message. Does not implicitly {@link table.ItemBase.verify|verify} messages.
         * @param message ItemBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.IItemBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified ItemBase message, length delimited. Does not implicitly {@link table.ItemBase.verify|verify} messages.
         * @param message ItemBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.IItemBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an ItemBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ItemBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.ItemBase;

        /**
         * Decodes an ItemBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ItemBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.ItemBase;

        /**
         * Verifies an ItemBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ItemBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ItemBase
         */
        public static fromObject(object: { [k: string]: any }): table.ItemBase;

        /**
         * Creates a plain object from an ItemBase message. Also converts values to other types if specified.
         * @param message ItemBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.ItemBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ItemBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ItemBaseDataDefine. */
    interface IItemBaseDataDefine {

        /** ItemBaseDataDefine Id */
        Id?: (number|null);

        /** ItemBaseDataDefine Type */
        Type?: (number|null);

        /** ItemBaseDataDefine SubType */
        SubType?: (number|null);

        /** ItemBaseDataDefine Color */
        Color?: (number|null);

        /** ItemBaseDataDefine ImageId */
        ImageId?: (number|null);

        /** ItemBaseDataDefine Name */
        Name?: (string|null);

        /** ItemBaseDataDefine Desc */
        Desc?: (string|null);

        /** ItemBaseDataDefine Clothes */
        Clothes?: (number|null);

        /** ItemBaseDataDefine TypeDes */
        TypeDes?: (string|null);

        /** ItemBaseDataDefine Tradable */
        Tradable?: (number|null);
    }

    /** Represents an ItemBaseDataDefine. */
    class ItemBaseDataDefine implements IItemBaseDataDefine {

        /**
         * Constructs a new ItemBaseDataDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.IItemBaseDataDefine);

        /** ItemBaseDataDefine Id. */
        public Id: number;

        /** ItemBaseDataDefine Type. */
        public Type: number;

        /** ItemBaseDataDefine SubType. */
        public SubType: number;

        /** ItemBaseDataDefine Color. */
        public Color: number;

        /** ItemBaseDataDefine ImageId. */
        public ImageId: number;

        /** ItemBaseDataDefine Name. */
        public Name: string;

        /** ItemBaseDataDefine Desc. */
        public Desc: string;

        /** ItemBaseDataDefine Clothes. */
        public Clothes: number;

        /** ItemBaseDataDefine TypeDes. */
        public TypeDes: string;

        /** ItemBaseDataDefine Tradable. */
        public Tradable: number;

        /**
         * Creates a new ItemBaseDataDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ItemBaseDataDefine instance
         */
        public static create(properties?: table.IItemBaseDataDefine): table.ItemBaseDataDefine;

        /**
         * Encodes the specified ItemBaseDataDefine message. Does not implicitly {@link table.ItemBaseDataDefine.verify|verify} messages.
         * @param message ItemBaseDataDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.IItemBaseDataDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified ItemBaseDataDefine message, length delimited. Does not implicitly {@link table.ItemBaseDataDefine.verify|verify} messages.
         * @param message ItemBaseDataDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.IItemBaseDataDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an ItemBaseDataDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ItemBaseDataDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.ItemBaseDataDefine;

        /**
         * Decodes an ItemBaseDataDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ItemBaseDataDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.ItemBaseDataDefine;

        /**
         * Verifies an ItemBaseDataDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ItemBaseDataDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ItemBaseDataDefine
         */
        public static fromObject(object: { [k: string]: any }): table.ItemBaseDataDefine;

        /**
         * Creates a plain object from an ItemBaseDataDefine message. Also converts values to other types if specified.
         * @param message ItemBaseDataDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.ItemBaseDataDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ItemBaseDataDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LevelBasee. */
    interface ILevelBasee {

        /** LevelBasee TLevel */
        TLevel?: (table.ITLevelDefine[]|null);
    }

    /** Represents a LevelBasee. */
    class LevelBasee implements ILevelBasee {

        /**
         * Constructs a new LevelBasee.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ILevelBasee);

        /** LevelBasee TLevel. */
        public TLevel: table.ITLevelDefine[];

        /**
         * Creates a new LevelBasee instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LevelBasee instance
         */
        public static create(properties?: table.ILevelBasee): table.LevelBasee;

        /**
         * Encodes the specified LevelBasee message. Does not implicitly {@link table.LevelBasee.verify|verify} messages.
         * @param message LevelBasee message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ILevelBasee, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified LevelBasee message, length delimited. Does not implicitly {@link table.LevelBasee.verify|verify} messages.
         * @param message LevelBasee message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ILevelBasee, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a LevelBasee message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LevelBasee
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.LevelBasee;

        /**
         * Decodes a LevelBasee message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LevelBasee
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.LevelBasee;

        /**
         * Verifies a LevelBasee message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LevelBasee message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LevelBasee
         */
        public static fromObject(object: { [k: string]: any }): table.LevelBasee;

        /**
         * Creates a plain object from a LevelBasee message. Also converts values to other types if specified.
         * @param message LevelBasee
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.LevelBasee, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LevelBasee to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TLevelDefine. */
    interface ITLevelDefine {

        /** TLevelDefine Id */
        Id?: (number|null);

        /** TLevelDefine ExpNums */
        ExpNums?: (number|null);

        /** TLevelDefine Reward */
        Reward?: (number|null);
    }

    /** Represents a TLevelDefine. */
    class TLevelDefine implements ITLevelDefine {

        /**
         * Constructs a new TLevelDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITLevelDefine);

        /** TLevelDefine Id. */
        public Id: number;

        /** TLevelDefine ExpNums. */
        public ExpNums: number;

        /** TLevelDefine Reward. */
        public Reward: number;

        /**
         * Creates a new TLevelDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TLevelDefine instance
         */
        public static create(properties?: table.ITLevelDefine): table.TLevelDefine;

        /**
         * Encodes the specified TLevelDefine message. Does not implicitly {@link table.TLevelDefine.verify|verify} messages.
         * @param message TLevelDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITLevelDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TLevelDefine message, length delimited. Does not implicitly {@link table.TLevelDefine.verify|verify} messages.
         * @param message TLevelDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITLevelDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TLevelDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TLevelDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TLevelDefine;

        /**
         * Decodes a TLevelDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TLevelDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TLevelDefine;

        /**
         * Verifies a TLevelDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TLevelDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TLevelDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TLevelDefine;

        /**
         * Creates a plain object from a TLevelDefine message. Also converts values to other types if specified.
         * @param message TLevelDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TLevelDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TLevelDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MapEventBase. */
    interface IMapEventBase {

        /** MapEventBase TMapEvent */
        TMapEvent?: (table.ITMapEventDefine[]|null);
    }

    /** Represents a MapEventBase. */
    class MapEventBase implements IMapEventBase {

        /**
         * Constructs a new MapEventBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.IMapEventBase);

        /** MapEventBase TMapEvent. */
        public TMapEvent: table.ITMapEventDefine[];

        /**
         * Creates a new MapEventBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MapEventBase instance
         */
        public static create(properties?: table.IMapEventBase): table.MapEventBase;

        /**
         * Encodes the specified MapEventBase message. Does not implicitly {@link table.MapEventBase.verify|verify} messages.
         * @param message MapEventBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.IMapEventBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified MapEventBase message, length delimited. Does not implicitly {@link table.MapEventBase.verify|verify} messages.
         * @param message MapEventBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.IMapEventBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a MapEventBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MapEventBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.MapEventBase;

        /**
         * Decodes a MapEventBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MapEventBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.MapEventBase;

        /**
         * Verifies a MapEventBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MapEventBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MapEventBase
         */
        public static fromObject(object: { [k: string]: any }): table.MapEventBase;

        /**
         * Creates a plain object from a MapEventBase message. Also converts values to other types if specified.
         * @param message MapEventBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.MapEventBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MapEventBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TMapEventDefine. */
    interface ITMapEventDefine {

        /** TMapEventDefine Id */
        Id?: (number|null);

        /** TMapEventDefine Type */
        Type?: (number|null);

        /** TMapEventDefine Desc */
        Desc?: (string|null);

        /** TMapEventDefine MoneyType */
        MoneyType?: (number|null);

        /** TMapEventDefine Price */
        Price?: (number|null);

        /** TMapEventDefine Icon */
        Icon?: (string|null);

        /** TMapEventDefine Reward */
        Reward?: (string[]|null);

        /** TMapEventDefine Params */
        Params?: (string|null);
    }

    /** Represents a TMapEventDefine. */
    class TMapEventDefine implements ITMapEventDefine {

        /**
         * Constructs a new TMapEventDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITMapEventDefine);

        /** TMapEventDefine Id. */
        public Id: number;

        /** TMapEventDefine Type. */
        public Type: number;

        /** TMapEventDefine Desc. */
        public Desc: string;

        /** TMapEventDefine MoneyType. */
        public MoneyType: number;

        /** TMapEventDefine Price. */
        public Price: number;

        /** TMapEventDefine Icon. */
        public Icon: string;

        /** TMapEventDefine Reward. */
        public Reward: string[];

        /** TMapEventDefine Params. */
        public Params: string;

        /**
         * Creates a new TMapEventDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TMapEventDefine instance
         */
        public static create(properties?: table.ITMapEventDefine): table.TMapEventDefine;

        /**
         * Encodes the specified TMapEventDefine message. Does not implicitly {@link table.TMapEventDefine.verify|verify} messages.
         * @param message TMapEventDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITMapEventDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TMapEventDefine message, length delimited. Does not implicitly {@link table.TMapEventDefine.verify|verify} messages.
         * @param message TMapEventDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITMapEventDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TMapEventDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TMapEventDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TMapEventDefine;

        /**
         * Decodes a TMapEventDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TMapEventDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TMapEventDefine;

        /**
         * Verifies a TMapEventDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TMapEventDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TMapEventDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TMapEventDefine;

        /**
         * Creates a plain object from a TMapEventDefine message. Also converts values to other types if specified.
         * @param message TMapEventDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TMapEventDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TMapEventDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MapEventRefreshBase. */
    interface IMapEventRefreshBase {

        /** MapEventRefreshBase TMapEventRefresh */
        TMapEventRefresh?: (table.ITMapEventRefreshDefine[]|null);
    }

    /** Represents a MapEventRefreshBase. */
    class MapEventRefreshBase implements IMapEventRefreshBase {

        /**
         * Constructs a new MapEventRefreshBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.IMapEventRefreshBase);

        /** MapEventRefreshBase TMapEventRefresh. */
        public TMapEventRefresh: table.ITMapEventRefreshDefine[];

        /**
         * Creates a new MapEventRefreshBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MapEventRefreshBase instance
         */
        public static create(properties?: table.IMapEventRefreshBase): table.MapEventRefreshBase;

        /**
         * Encodes the specified MapEventRefreshBase message. Does not implicitly {@link table.MapEventRefreshBase.verify|verify} messages.
         * @param message MapEventRefreshBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.IMapEventRefreshBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified MapEventRefreshBase message, length delimited. Does not implicitly {@link table.MapEventRefreshBase.verify|verify} messages.
         * @param message MapEventRefreshBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.IMapEventRefreshBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a MapEventRefreshBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MapEventRefreshBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.MapEventRefreshBase;

        /**
         * Decodes a MapEventRefreshBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MapEventRefreshBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.MapEventRefreshBase;

        /**
         * Verifies a MapEventRefreshBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MapEventRefreshBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MapEventRefreshBase
         */
        public static fromObject(object: { [k: string]: any }): table.MapEventRefreshBase;

        /**
         * Creates a plain object from a MapEventRefreshBase message. Also converts values to other types if specified.
         * @param message MapEventRefreshBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.MapEventRefreshBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MapEventRefreshBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TMapEventRefreshDefine. */
    interface ITMapEventRefreshDefine {

        /** TMapEventRefreshDefine Id */
        Id?: (number|null);

        /** TMapEventRefreshDefine TypeRand */
        TypeRand?: (string[]|null);

        /** TMapEventRefreshDefine RangeMin */
        RangeMin?: (number|null);

        /** TMapEventRefreshDefine RangeMax */
        RangeMax?: (number|null);

        /** TMapEventRefreshDefine Num */
        Num?: (number|null);
    }

    /** Represents a TMapEventRefreshDefine. */
    class TMapEventRefreshDefine implements ITMapEventRefreshDefine {

        /**
         * Constructs a new TMapEventRefreshDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITMapEventRefreshDefine);

        /** TMapEventRefreshDefine Id. */
        public Id: number;

        /** TMapEventRefreshDefine TypeRand. */
        public TypeRand: string[];

        /** TMapEventRefreshDefine RangeMin. */
        public RangeMin: number;

        /** TMapEventRefreshDefine RangeMax. */
        public RangeMax: number;

        /** TMapEventRefreshDefine Num. */
        public Num: number;

        /**
         * Creates a new TMapEventRefreshDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TMapEventRefreshDefine instance
         */
        public static create(properties?: table.ITMapEventRefreshDefine): table.TMapEventRefreshDefine;

        /**
         * Encodes the specified TMapEventRefreshDefine message. Does not implicitly {@link table.TMapEventRefreshDefine.verify|verify} messages.
         * @param message TMapEventRefreshDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITMapEventRefreshDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TMapEventRefreshDefine message, length delimited. Does not implicitly {@link table.TMapEventRefreshDefine.verify|verify} messages.
         * @param message TMapEventRefreshDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITMapEventRefreshDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TMapEventRefreshDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TMapEventRefreshDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TMapEventRefreshDefine;

        /**
         * Decodes a TMapEventRefreshDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TMapEventRefreshDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TMapEventRefreshDefine;

        /**
         * Verifies a TMapEventRefreshDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TMapEventRefreshDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TMapEventRefreshDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TMapEventRefreshDefine;

        /**
         * Creates a plain object from a TMapEventRefreshDefine message. Also converts values to other types if specified.
         * @param message TMapEventRefreshDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TMapEventRefreshDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TMapEventRefreshDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a NameBase. */
    interface INameBase {

        /** NameBase TName */
        TName?: (table.ITNameDefine[]|null);
    }

    /** Represents a NameBase. */
    class NameBase implements INameBase {

        /**
         * Constructs a new NameBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.INameBase);

        /** NameBase TName. */
        public TName: table.ITNameDefine[];

        /**
         * Creates a new NameBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns NameBase instance
         */
        public static create(properties?: table.INameBase): table.NameBase;

        /**
         * Encodes the specified NameBase message. Does not implicitly {@link table.NameBase.verify|verify} messages.
         * @param message NameBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.INameBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified NameBase message, length delimited. Does not implicitly {@link table.NameBase.verify|verify} messages.
         * @param message NameBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.INameBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a NameBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NameBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.NameBase;

        /**
         * Decodes a NameBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns NameBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.NameBase;

        /**
         * Verifies a NameBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a NameBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns NameBase
         */
        public static fromObject(object: { [k: string]: any }): table.NameBase;

        /**
         * Creates a plain object from a NameBase message. Also converts values to other types if specified.
         * @param message NameBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.NameBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this NameBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TNameDefine. */
    interface ITNameDefine {

        /** TNameDefine Id */
        Id?: (number|null);

        /** TNameDefine Name */
        Name?: (string|null);
    }

    /** Represents a TNameDefine. */
    class TNameDefine implements ITNameDefine {

        /**
         * Constructs a new TNameDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITNameDefine);

        /** TNameDefine Id. */
        public Id: number;

        /** TNameDefine Name. */
        public Name: string;

        /**
         * Creates a new TNameDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TNameDefine instance
         */
        public static create(properties?: table.ITNameDefine): table.TNameDefine;

        /**
         * Encodes the specified TNameDefine message. Does not implicitly {@link table.TNameDefine.verify|verify} messages.
         * @param message TNameDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITNameDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TNameDefine message, length delimited. Does not implicitly {@link table.TNameDefine.verify|verify} messages.
         * @param message TNameDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITNameDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TNameDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TNameDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TNameDefine;

        /**
         * Decodes a TNameDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TNameDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TNameDefine;

        /**
         * Verifies a TNameDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TNameDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TNameDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TNameDefine;

        /**
         * Creates a plain object from a TNameDefine message. Also converts values to other types if specified.
         * @param message TNameDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TNameDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TNameDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a NoticeBase. */
    interface INoticeBase {

        /** NoticeBase TNotice */
        TNotice?: (table.ITNoticeDefine[]|null);
    }

    /** Represents a NoticeBase. */
    class NoticeBase implements INoticeBase {

        /**
         * Constructs a new NoticeBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.INoticeBase);

        /** NoticeBase TNotice. */
        public TNotice: table.ITNoticeDefine[];

        /**
         * Creates a new NoticeBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns NoticeBase instance
         */
        public static create(properties?: table.INoticeBase): table.NoticeBase;

        /**
         * Encodes the specified NoticeBase message. Does not implicitly {@link table.NoticeBase.verify|verify} messages.
         * @param message NoticeBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.INoticeBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified NoticeBase message, length delimited. Does not implicitly {@link table.NoticeBase.verify|verify} messages.
         * @param message NoticeBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.INoticeBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a NoticeBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NoticeBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.NoticeBase;

        /**
         * Decodes a NoticeBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns NoticeBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.NoticeBase;

        /**
         * Verifies a NoticeBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a NoticeBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns NoticeBase
         */
        public static fromObject(object: { [k: string]: any }): table.NoticeBase;

        /**
         * Creates a plain object from a NoticeBase message. Also converts values to other types if specified.
         * @param message NoticeBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.NoticeBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this NoticeBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TNoticeDefine. */
    interface ITNoticeDefine {

        /** TNoticeDefine Id */
        Id?: (number|null);

        /** TNoticeDefine Avatar */
        Avatar?: (number|null);

        /** TNoticeDefine Info */
        Info?: (string|null);
    }

    /** Represents a TNoticeDefine. */
    class TNoticeDefine implements ITNoticeDefine {

        /**
         * Constructs a new TNoticeDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITNoticeDefine);

        /** TNoticeDefine Id. */
        public Id: number;

        /** TNoticeDefine Avatar. */
        public Avatar: number;

        /** TNoticeDefine Info. */
        public Info: string;

        /**
         * Creates a new TNoticeDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TNoticeDefine instance
         */
        public static create(properties?: table.ITNoticeDefine): table.TNoticeDefine;

        /**
         * Encodes the specified TNoticeDefine message. Does not implicitly {@link table.TNoticeDefine.verify|verify} messages.
         * @param message TNoticeDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITNoticeDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TNoticeDefine message, length delimited. Does not implicitly {@link table.TNoticeDefine.verify|verify} messages.
         * @param message TNoticeDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITNoticeDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TNoticeDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TNoticeDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TNoticeDefine;

        /**
         * Decodes a TNoticeDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TNoticeDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TNoticeDefine;

        /**
         * Verifies a TNoticeDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TNoticeDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TNoticeDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TNoticeDefine;

        /**
         * Creates a plain object from a TNoticeDefine message. Also converts values to other types if specified.
         * @param message TNoticeDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TNoticeDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TNoticeDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ProtoMsgIndex. */
    interface IProtoMsgIndex {

        /** ProtoMsgIndex ProtoId */
        ProtoId?: (table.IProtoIdDefine[]|null);
    }

    /** Represents a ProtoMsgIndex. */
    class ProtoMsgIndex implements IProtoMsgIndex {

        /**
         * Constructs a new ProtoMsgIndex.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.IProtoMsgIndex);

        /** ProtoMsgIndex ProtoId. */
        public ProtoId: table.IProtoIdDefine[];

        /**
         * Creates a new ProtoMsgIndex instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ProtoMsgIndex instance
         */
        public static create(properties?: table.IProtoMsgIndex): table.ProtoMsgIndex;

        /**
         * Encodes the specified ProtoMsgIndex message. Does not implicitly {@link table.ProtoMsgIndex.verify|verify} messages.
         * @param message ProtoMsgIndex message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.IProtoMsgIndex, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified ProtoMsgIndex message, length delimited. Does not implicitly {@link table.ProtoMsgIndex.verify|verify} messages.
         * @param message ProtoMsgIndex message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.IProtoMsgIndex, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a ProtoMsgIndex message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ProtoMsgIndex
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.ProtoMsgIndex;

        /**
         * Decodes a ProtoMsgIndex message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ProtoMsgIndex
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.ProtoMsgIndex;

        /**
         * Verifies a ProtoMsgIndex message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ProtoMsgIndex message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ProtoMsgIndex
         */
        public static fromObject(object: { [k: string]: any }): table.ProtoMsgIndex;

        /**
         * Creates a plain object from a ProtoMsgIndex message. Also converts values to other types if specified.
         * @param message ProtoMsgIndex
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.ProtoMsgIndex, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ProtoMsgIndex to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ProtoIdDefine. */
    interface IProtoIdDefine {

        /** ProtoIdDefine Id */
        Id?: (number|null);

        /** ProtoIdDefine Name */
        Name?: (string|null);
    }

    /** Represents a ProtoIdDefine. */
    class ProtoIdDefine implements IProtoIdDefine {

        /**
         * Constructs a new ProtoIdDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.IProtoIdDefine);

        /** ProtoIdDefine Id. */
        public Id: number;

        /** ProtoIdDefine Name. */
        public Name: string;

        /**
         * Creates a new ProtoIdDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ProtoIdDefine instance
         */
        public static create(properties?: table.IProtoIdDefine): table.ProtoIdDefine;

        /**
         * Encodes the specified ProtoIdDefine message. Does not implicitly {@link table.ProtoIdDefine.verify|verify} messages.
         * @param message ProtoIdDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.IProtoIdDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified ProtoIdDefine message, length delimited. Does not implicitly {@link table.ProtoIdDefine.verify|verify} messages.
         * @param message ProtoIdDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.IProtoIdDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a ProtoIdDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ProtoIdDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.ProtoIdDefine;

        /**
         * Decodes a ProtoIdDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ProtoIdDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.ProtoIdDefine;

        /**
         * Verifies a ProtoIdDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ProtoIdDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ProtoIdDefine
         */
        public static fromObject(object: { [k: string]: any }): table.ProtoIdDefine;

        /**
         * Creates a plain object from a ProtoIdDefine message. Also converts values to other types if specified.
         * @param message ProtoIdDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.ProtoIdDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ProtoIdDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RechargeBase. */
    interface IRechargeBase {

        /** RechargeBase TRecharge */
        TRecharge?: (table.ITRechargeDefine[]|null);
    }

    /** Represents a RechargeBase. */
    class RechargeBase implements IRechargeBase {

        /**
         * Constructs a new RechargeBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.IRechargeBase);

        /** RechargeBase TRecharge. */
        public TRecharge: table.ITRechargeDefine[];

        /**
         * Creates a new RechargeBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RechargeBase instance
         */
        public static create(properties?: table.IRechargeBase): table.RechargeBase;

        /**
         * Encodes the specified RechargeBase message. Does not implicitly {@link table.RechargeBase.verify|verify} messages.
         * @param message RechargeBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.IRechargeBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified RechargeBase message, length delimited. Does not implicitly {@link table.RechargeBase.verify|verify} messages.
         * @param message RechargeBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.IRechargeBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a RechargeBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RechargeBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.RechargeBase;

        /**
         * Decodes a RechargeBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RechargeBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.RechargeBase;

        /**
         * Verifies a RechargeBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RechargeBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RechargeBase
         */
        public static fromObject(object: { [k: string]: any }): table.RechargeBase;

        /**
         * Creates a plain object from a RechargeBase message. Also converts values to other types if specified.
         * @param message RechargeBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.RechargeBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RechargeBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TRechargeDefine. */
    interface ITRechargeDefine {

        /** TRechargeDefine Id */
        Id?: (number|null);

        /** TRechargeDefine Price */
        Price?: (number|null);

        /** TRechargeDefine Info */
        Info?: (string|null);
    }

    /** Represents a TRechargeDefine. */
    class TRechargeDefine implements ITRechargeDefine {

        /**
         * Constructs a new TRechargeDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITRechargeDefine);

        /** TRechargeDefine Id. */
        public Id: number;

        /** TRechargeDefine Price. */
        public Price: number;

        /** TRechargeDefine Info. */
        public Info: string;

        /**
         * Creates a new TRechargeDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TRechargeDefine instance
         */
        public static create(properties?: table.ITRechargeDefine): table.TRechargeDefine;

        /**
         * Encodes the specified TRechargeDefine message. Does not implicitly {@link table.TRechargeDefine.verify|verify} messages.
         * @param message TRechargeDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITRechargeDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TRechargeDefine message, length delimited. Does not implicitly {@link table.TRechargeDefine.verify|verify} messages.
         * @param message TRechargeDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITRechargeDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TRechargeDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TRechargeDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TRechargeDefine;

        /**
         * Decodes a TRechargeDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TRechargeDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TRechargeDefine;

        /**
         * Verifies a TRechargeDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TRechargeDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TRechargeDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TRechargeDefine;

        /**
         * Creates a plain object from a TRechargeDefine message. Also converts values to other types if specified.
         * @param message TRechargeDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TRechargeDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TRechargeDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ShopBase. */
    interface IShopBase {

        /** ShopBase TShop */
        TShop?: (table.ITShopDefine[]|null);
    }

    /** Represents a ShopBase. */
    class ShopBase implements IShopBase {

        /**
         * Constructs a new ShopBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.IShopBase);

        /** ShopBase TShop. */
        public TShop: table.ITShopDefine[];

        /**
         * Creates a new ShopBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ShopBase instance
         */
        public static create(properties?: table.IShopBase): table.ShopBase;

        /**
         * Encodes the specified ShopBase message. Does not implicitly {@link table.ShopBase.verify|verify} messages.
         * @param message ShopBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.IShopBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified ShopBase message, length delimited. Does not implicitly {@link table.ShopBase.verify|verify} messages.
         * @param message ShopBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.IShopBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a ShopBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ShopBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.ShopBase;

        /**
         * Decodes a ShopBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ShopBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.ShopBase;

        /**
         * Verifies a ShopBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ShopBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ShopBase
         */
        public static fromObject(object: { [k: string]: any }): table.ShopBase;

        /**
         * Creates a plain object from a ShopBase message. Also converts values to other types if specified.
         * @param message ShopBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.ShopBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ShopBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TShopDefine. */
    interface ITShopDefine {

        /** TShopDefine Id */
        Id?: (number|null);

        /** TShopDefine Itemid */
        Itemid?: (number|null);

        /** TShopDefine Name */
        Name?: (string|null);

        /** TShopDefine Type */
        Type?: (number|null);

        /** TShopDefine Num */
        Num?: (number|null);

        /** TShopDefine Rmb */
        Rmb?: (number|null);

        /** TShopDefine Price */
        Price?: (number|null);

        /** TShopDefine Send */
        Send?: (number|null);
    }

    /** Represents a TShopDefine. */
    class TShopDefine implements ITShopDefine {

        /**
         * Constructs a new TShopDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITShopDefine);

        /** TShopDefine Id. */
        public Id: number;

        /** TShopDefine Itemid. */
        public Itemid: number;

        /** TShopDefine Name. */
        public Name: string;

        /** TShopDefine Type. */
        public Type: number;

        /** TShopDefine Num. */
        public Num: number;

        /** TShopDefine Rmb. */
        public Rmb: number;

        /** TShopDefine Price. */
        public Price: number;

        /** TShopDefine Send. */
        public Send: number;

        /**
         * Creates a new TShopDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TShopDefine instance
         */
        public static create(properties?: table.ITShopDefine): table.TShopDefine;

        /**
         * Encodes the specified TShopDefine message. Does not implicitly {@link table.TShopDefine.verify|verify} messages.
         * @param message TShopDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITShopDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TShopDefine message, length delimited. Does not implicitly {@link table.TShopDefine.verify|verify} messages.
         * @param message TShopDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITShopDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TShopDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TShopDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TShopDefine;

        /**
         * Decodes a TShopDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TShopDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TShopDefine;

        /**
         * Verifies a TShopDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TShopDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TShopDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TShopDefine;

        /**
         * Creates a plain object from a TShopDefine message. Also converts values to other types if specified.
         * @param message TShopDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TShopDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TShopDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SignBase. */
    interface ISignBase {

        /** SignBase TSign */
        TSign?: (table.ITSignDefine[]|null);
    }

    /** Represents a SignBase. */
    class SignBase implements ISignBase {

        /**
         * Constructs a new SignBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ISignBase);

        /** SignBase TSign. */
        public TSign: table.ITSignDefine[];

        /**
         * Creates a new SignBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SignBase instance
         */
        public static create(properties?: table.ISignBase): table.SignBase;

        /**
         * Encodes the specified SignBase message. Does not implicitly {@link table.SignBase.verify|verify} messages.
         * @param message SignBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ISignBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified SignBase message, length delimited. Does not implicitly {@link table.SignBase.verify|verify} messages.
         * @param message SignBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ISignBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a SignBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SignBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.SignBase;

        /**
         * Decodes a SignBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SignBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.SignBase;

        /**
         * Verifies a SignBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SignBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SignBase
         */
        public static fromObject(object: { [k: string]: any }): table.SignBase;

        /**
         * Creates a plain object from a SignBase message. Also converts values to other types if specified.
         * @param message SignBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.SignBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SignBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TSignDefine. */
    interface ITSignDefine {

        /** TSignDefine Id */
        Id?: (number|null);

        /** TSignDefine CostId */
        CostId?: (number|null);

        /** TSignDefine Num */
        Num?: (number|null);
    }

    /** Represents a TSignDefine. */
    class TSignDefine implements ITSignDefine {

        /**
         * Constructs a new TSignDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITSignDefine);

        /** TSignDefine Id. */
        public Id: number;

        /** TSignDefine CostId. */
        public CostId: number;

        /** TSignDefine Num. */
        public Num: number;

        /**
         * Creates a new TSignDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TSignDefine instance
         */
        public static create(properties?: table.ITSignDefine): table.TSignDefine;

        /**
         * Encodes the specified TSignDefine message. Does not implicitly {@link table.TSignDefine.verify|verify} messages.
         * @param message TSignDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITSignDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TSignDefine message, length delimited. Does not implicitly {@link table.TSignDefine.verify|verify} messages.
         * @param message TSignDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITSignDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TSignDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TSignDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TSignDefine;

        /**
         * Decodes a TSignDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TSignDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TSignDefine;

        /**
         * Verifies a TSignDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TSignDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TSignDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TSignDefine;

        /**
         * Creates a plain object from a TSignDefine message. Also converts values to other types if specified.
         * @param message TSignDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TSignDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TSignDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TaskBase. */
    interface ITaskBase {

        /** TaskBase TTask */
        TTask?: (table.ITTaskDefine[]|null);
    }

    /** Represents a TaskBase. */
    class TaskBase implements ITaskBase {

        /**
         * Constructs a new TaskBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITaskBase);

        /** TaskBase TTask. */
        public TTask: table.ITTaskDefine[];

        /**
         * Creates a new TaskBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TaskBase instance
         */
        public static create(properties?: table.ITaskBase): table.TaskBase;

        /**
         * Encodes the specified TaskBase message. Does not implicitly {@link table.TaskBase.verify|verify} messages.
         * @param message TaskBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITaskBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TaskBase message, length delimited. Does not implicitly {@link table.TaskBase.verify|verify} messages.
         * @param message TaskBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITaskBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TaskBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TaskBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TaskBase;

        /**
         * Decodes a TaskBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TaskBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TaskBase;

        /**
         * Verifies a TaskBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TaskBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TaskBase
         */
        public static fromObject(object: { [k: string]: any }): table.TaskBase;

        /**
         * Creates a plain object from a TaskBase message. Also converts values to other types if specified.
         * @param message TaskBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TaskBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TaskBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TTaskDefine. */
    interface ITTaskDefine {

        /** TTaskDefine Id */
        Id?: (number|null);

        /** TTaskDefine Desc */
        Desc?: (string|null);

        /** TTaskDefine Count */
        Count?: (number|null);

        /** TTaskDefine Reward */
        Reward?: (string|null);
    }

    /** Represents a TTaskDefine. */
    class TTaskDefine implements ITTaskDefine {

        /**
         * Constructs a new TTaskDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITTaskDefine);

        /** TTaskDefine Id. */
        public Id: number;

        /** TTaskDefine Desc. */
        public Desc: string;

        /** TTaskDefine Count. */
        public Count: number;

        /** TTaskDefine Reward. */
        public Reward: string;

        /**
         * Creates a new TTaskDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TTaskDefine instance
         */
        public static create(properties?: table.ITTaskDefine): table.TTaskDefine;

        /**
         * Encodes the specified TTaskDefine message. Does not implicitly {@link table.TTaskDefine.verify|verify} messages.
         * @param message TTaskDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITTaskDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TTaskDefine message, length delimited. Does not implicitly {@link table.TTaskDefine.verify|verify} messages.
         * @param message TTaskDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITTaskDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TTaskDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TTaskDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TTaskDefine;

        /**
         * Decodes a TTaskDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TTaskDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TTaskDefine;

        /**
         * Verifies a TTaskDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TTaskDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TTaskDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TTaskDefine;

        /**
         * Creates a plain object from a TTaskDefine message. Also converts values to other types if specified.
         * @param message TTaskDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TTaskDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TTaskDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TexasRoomBase. */
    interface ITexasRoomBase {

        /** TexasRoomBase TexasRoom */
        TexasRoom?: (table.ITexasRoomDefine[]|null);
    }

    /** Represents a TexasRoomBase. */
    class TexasRoomBase implements ITexasRoomBase {

        /**
         * Constructs a new TexasRoomBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITexasRoomBase);

        /** TexasRoomBase TexasRoom. */
        public TexasRoom: table.ITexasRoomDefine[];

        /**
         * Creates a new TexasRoomBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TexasRoomBase instance
         */
        public static create(properties?: table.ITexasRoomBase): table.TexasRoomBase;

        /**
         * Encodes the specified TexasRoomBase message. Does not implicitly {@link table.TexasRoomBase.verify|verify} messages.
         * @param message TexasRoomBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITexasRoomBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TexasRoomBase message, length delimited. Does not implicitly {@link table.TexasRoomBase.verify|verify} messages.
         * @param message TexasRoomBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITexasRoomBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TexasRoomBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TexasRoomBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TexasRoomBase;

        /**
         * Decodes a TexasRoomBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TexasRoomBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TexasRoomBase;

        /**
         * Verifies a TexasRoomBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TexasRoomBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TexasRoomBase
         */
        public static fromObject(object: { [k: string]: any }): table.TexasRoomBase;

        /**
         * Creates a plain object from a TexasRoomBase message. Also converts values to other types if specified.
         * @param message TexasRoomBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TexasRoomBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TexasRoomBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TexasRoomDefine. */
    interface ITexasRoomDefine {

        /** TexasRoomDefine Id */
        Id?: (number|null);

        /** TexasRoomDefine Desc */
        Desc?: (string|null);

        /** TexasRoomDefine Type */
        Type?: (number|null);

        /** TexasRoomDefine SBlind */
        SBlind?: (number|null);

        /** TexasRoomDefine BBlind */
        BBlind?: (number|null);

        /** TexasRoomDefine SBuyin */
        SBuyin?: (number|null);

        /** TexasRoomDefine BBuyin */
        BBuyin?: (number|null);

        /** TexasRoomDefine Tax */
        Tax?: (number|null);

        /** TexasRoomDefine Seat */
        Seat?: (number|null);

        /** TexasRoomDefine Pattern */
        Pattern?: (number|null);

        /** TexasRoomDefine Cd */
        Cd?: (number|null);

        /** TexasRoomDefine ClientCd */
        ClientCd?: (number|null);

        /** TexasRoomDefine WaitingTime */
        WaitingTime?: (number|null);

        /** TexasRoomDefine Ante */
        Ante?: (number[]|null);

        /** TexasRoomDefine Timeout */
        Timeout?: (number|null);

        /** TexasRoomDefine DelayPosTime */
        DelayPosTime?: (number|null);

        /** TexasRoomDefine Rbt */
        Rbt?: (number|null);

        /** TexasRoomDefine KeepSeat */
        KeepSeat?: (number|null);

        /** TexasRoomDefine Initrbt */
        Initrbt?: (number|null);
    }

    /** Represents a TexasRoomDefine. */
    class TexasRoomDefine implements ITexasRoomDefine {

        /**
         * Constructs a new TexasRoomDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITexasRoomDefine);

        /** TexasRoomDefine Id. */
        public Id: number;

        /** TexasRoomDefine Desc. */
        public Desc: string;

        /** TexasRoomDefine Type. */
        public Type: number;

        /** TexasRoomDefine SBlind. */
        public SBlind: number;

        /** TexasRoomDefine BBlind. */
        public BBlind: number;

        /** TexasRoomDefine SBuyin. */
        public SBuyin: number;

        /** TexasRoomDefine BBuyin. */
        public BBuyin: number;

        /** TexasRoomDefine Tax. */
        public Tax: number;

        /** TexasRoomDefine Seat. */
        public Seat: number;

        /** TexasRoomDefine Pattern. */
        public Pattern: number;

        /** TexasRoomDefine Cd. */
        public Cd: number;

        /** TexasRoomDefine ClientCd. */
        public ClientCd: number;

        /** TexasRoomDefine WaitingTime. */
        public WaitingTime: number;

        /** TexasRoomDefine Ante. */
        public Ante: number[];

        /** TexasRoomDefine Timeout. */
        public Timeout: number;

        /** TexasRoomDefine DelayPosTime. */
        public DelayPosTime: number;

        /** TexasRoomDefine Rbt. */
        public Rbt: number;

        /** TexasRoomDefine KeepSeat. */
        public KeepSeat: number;

        /** TexasRoomDefine Initrbt. */
        public Initrbt: number;

        /**
         * Creates a new TexasRoomDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TexasRoomDefine instance
         */
        public static create(properties?: table.ITexasRoomDefine): table.TexasRoomDefine;

        /**
         * Encodes the specified TexasRoomDefine message. Does not implicitly {@link table.TexasRoomDefine.verify|verify} messages.
         * @param message TexasRoomDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITexasRoomDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TexasRoomDefine message, length delimited. Does not implicitly {@link table.TexasRoomDefine.verify|verify} messages.
         * @param message TexasRoomDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITexasRoomDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TexasRoomDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TexasRoomDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TexasRoomDefine;

        /**
         * Decodes a TexasRoomDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TexasRoomDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TexasRoomDefine;

        /**
         * Verifies a TexasRoomDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TexasRoomDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TexasRoomDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TexasRoomDefine;

        /**
         * Creates a plain object from a TexasRoomDefine message. Also converts values to other types if specified.
         * @param message TexasRoomDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TexasRoomDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TexasRoomDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
