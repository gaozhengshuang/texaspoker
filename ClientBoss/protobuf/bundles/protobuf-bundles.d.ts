type Long = protobuf.Long;

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

    /** Properties of a GridItem. */
    interface IGridItem {

        /** GridItem index */
        index?: (number|null);

        /** GridItem id */
        id?: (number|null);

        /** GridItem num */
        num?: (number|null);

        /** GridItem gridtype */
        gridtype?: (number|null);

        /** GridItem control */
        control?: (boolean|null);
    }

    /** Represents a GridItem. */
    class GridItem implements IGridItem {

        /**
         * Constructs a new GridItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGridItem);

        /** GridItem index. */
        public index: number;

        /** GridItem id. */
        public id: number;

        /** GridItem num. */
        public num: number;

        /** GridItem gridtype. */
        public gridtype: number;

        /** GridItem control. */
        public control: boolean;

        /**
         * Creates a new GridItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GridItem instance
         */
        public static create(properties?: msg.IGridItem): msg.GridItem;

        /**
         * Encodes the specified GridItem message. Does not implicitly {@link msg.GridItem.verify|verify} messages.
         * @param message GridItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGridItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GridItem message, length delimited. Does not implicitly {@link msg.GridItem.verify|verify} messages.
         * @param message GridItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGridItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GridItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GridItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GridItem;

        /**
         * Decodes a GridItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GridItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GridItem;

        /**
         * Verifies a GridItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GridItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GridItem
         */
        public static fromObject(object: { [k: string]: any }): msg.GridItem;

        /**
         * Creates a plain object from a GridItem message. Also converts values to other types if specified.
         * @param message GridItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GridItem, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GridItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BT_UploadGameUser. */
    interface IBT_UploadGameUser {

        /** BT_UploadGameUser roomid */
        roomid?: (number|Long|null);

        /** BT_UploadGameUser bin */
        bin?: (msg.ISerialize|null);
    }

    /** Represents a BT_UploadGameUser. */
    class BT_UploadGameUser implements IBT_UploadGameUser {

        /**
         * Constructs a new BT_UploadGameUser.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBT_UploadGameUser);

        /** BT_UploadGameUser roomid. */
        public roomid: (number|Long);

        /** BT_UploadGameUser bin. */
        public bin?: (msg.ISerialize|null);

        /**
         * Creates a new BT_UploadGameUser instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BT_UploadGameUser instance
         */
        public static create(properties?: msg.IBT_UploadGameUser): msg.BT_UploadGameUser;

        /**
         * Encodes the specified BT_UploadGameUser message. Does not implicitly {@link msg.BT_UploadGameUser.verify|verify} messages.
         * @param message BT_UploadGameUser message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBT_UploadGameUser, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BT_UploadGameUser message, length delimited. Does not implicitly {@link msg.BT_UploadGameUser.verify|verify} messages.
         * @param message BT_UploadGameUser message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBT_UploadGameUser, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BT_UploadGameUser message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BT_UploadGameUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BT_UploadGameUser;

        /**
         * Decodes a BT_UploadGameUser message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BT_UploadGameUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BT_UploadGameUser;

        /**
         * Verifies a BT_UploadGameUser message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BT_UploadGameUser message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BT_UploadGameUser
         */
        public static fromObject(object: { [k: string]: any }): msg.BT_UploadGameUser;

        /**
         * Creates a plain object from a BT_UploadGameUser message. Also converts values to other types if specified.
         * @param message BT_UploadGameUser
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BT_UploadGameUser, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BT_UploadGameUser to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BT_ReqEnterRoom. */
    interface IBT_ReqEnterRoom {

        /** BT_ReqEnterRoom roomid */
        roomid?: (number|Long|null);

        /** BT_ReqEnterRoom userid */
        userid?: (number|Long|null);

        /** BT_ReqEnterRoom token */
        token?: (string|null);
    }

    /** Represents a BT_ReqEnterRoom. */
    class BT_ReqEnterRoom implements IBT_ReqEnterRoom {

        /**
         * Constructs a new BT_ReqEnterRoom.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBT_ReqEnterRoom);

        /** BT_ReqEnterRoom roomid. */
        public roomid: (number|Long);

        /** BT_ReqEnterRoom userid. */
        public userid: (number|Long);

        /** BT_ReqEnterRoom token. */
        public token: string;

        /**
         * Creates a new BT_ReqEnterRoom instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BT_ReqEnterRoom instance
         */
        public static create(properties?: msg.IBT_ReqEnterRoom): msg.BT_ReqEnterRoom;

        /**
         * Encodes the specified BT_ReqEnterRoom message. Does not implicitly {@link msg.BT_ReqEnterRoom.verify|verify} messages.
         * @param message BT_ReqEnterRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBT_ReqEnterRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BT_ReqEnterRoom message, length delimited. Does not implicitly {@link msg.BT_ReqEnterRoom.verify|verify} messages.
         * @param message BT_ReqEnterRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBT_ReqEnterRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BT_ReqEnterRoom message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BT_ReqEnterRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BT_ReqEnterRoom;

        /**
         * Decodes a BT_ReqEnterRoom message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BT_ReqEnterRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BT_ReqEnterRoom;

        /**
         * Verifies a BT_ReqEnterRoom message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BT_ReqEnterRoom message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BT_ReqEnterRoom
         */
        public static fromObject(object: { [k: string]: any }): msg.BT_ReqEnterRoom;

        /**
         * Creates a plain object from a BT_ReqEnterRoom message. Also converts values to other types if specified.
         * @param message BT_ReqEnterRoom
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BT_ReqEnterRoom, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BT_ReqEnterRoom to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BT_GameInit. */
    interface IBT_GameInit {

        /** BT_GameInit roomid */
        roomid?: (number|Long|null);

        /** BT_GameInit ownerid */
        ownerid?: (number|Long|null);

        /** BT_GameInit gamekind */
        gamekind?: (number|null);

        /** BT_GameInit diamond */
        diamond?: (number|null);

        /** BT_GameInit gold */
        gold?: (number|null);
    }

    /** Represents a BT_GameInit. */
    class BT_GameInit implements IBT_GameInit {

        /**
         * Constructs a new BT_GameInit.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBT_GameInit);

        /** BT_GameInit roomid. */
        public roomid: (number|Long);

        /** BT_GameInit ownerid. */
        public ownerid: (number|Long);

        /** BT_GameInit gamekind. */
        public gamekind: number;

        /** BT_GameInit diamond. */
        public diamond: number;

        /** BT_GameInit gold. */
        public gold: number;

        /**
         * Creates a new BT_GameInit instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BT_GameInit instance
         */
        public static create(properties?: msg.IBT_GameInit): msg.BT_GameInit;

        /**
         * Encodes the specified BT_GameInit message. Does not implicitly {@link msg.BT_GameInit.verify|verify} messages.
         * @param message BT_GameInit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBT_GameInit, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BT_GameInit message, length delimited. Does not implicitly {@link msg.BT_GameInit.verify|verify} messages.
         * @param message BT_GameInit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBT_GameInit, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BT_GameInit message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BT_GameInit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BT_GameInit;

        /**
         * Decodes a BT_GameInit message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BT_GameInit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BT_GameInit;

        /**
         * Verifies a BT_GameInit message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BT_GameInit message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BT_GameInit
         */
        public static fromObject(object: { [k: string]: any }): msg.BT_GameInit;

        /**
         * Creates a plain object from a BT_GameInit message. Also converts values to other types if specified.
         * @param message BT_GameInit
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BT_GameInit, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BT_GameInit to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BT_GameStart. */
    interface IBT_GameStart {

        /** BT_GameStart roomid */
        roomid?: (number|Long|null);

        /** BT_GameStart ownerid */
        ownerid?: (number|Long|null);
    }

    /** Represents a BT_GameStart. */
    class BT_GameStart implements IBT_GameStart {

        /**
         * Constructs a new BT_GameStart.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBT_GameStart);

        /** BT_GameStart roomid. */
        public roomid: (number|Long);

        /** BT_GameStart ownerid. */
        public ownerid: (number|Long);

        /**
         * Creates a new BT_GameStart instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BT_GameStart instance
         */
        public static create(properties?: msg.IBT_GameStart): msg.BT_GameStart;

        /**
         * Encodes the specified BT_GameStart message. Does not implicitly {@link msg.BT_GameStart.verify|verify} messages.
         * @param message BT_GameStart message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBT_GameStart, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BT_GameStart message, length delimited. Does not implicitly {@link msg.BT_GameStart.verify|verify} messages.
         * @param message BT_GameStart message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBT_GameStart, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BT_GameStart message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BT_GameStart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BT_GameStart;

        /**
         * Decodes a BT_GameStart message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BT_GameStart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BT_GameStart;

        /**
         * Verifies a BT_GameStart message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BT_GameStart message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BT_GameStart
         */
        public static fromObject(object: { [k: string]: any }): msg.BT_GameStart;

        /**
         * Creates a plain object from a BT_GameStart message. Also converts values to other types if specified.
         * @param message BT_GameStart
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BT_GameStart, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BT_GameStart to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BT_GameEnd. */
    interface IBT_GameEnd {

        /** BT_GameEnd roomid */
        roomid?: (number|Long|null);

        /** BT_GameEnd ownerid */
        ownerid?: (number|Long|null);

        /** BT_GameEnd reason */
        reason?: (string|null);

        /** BT_GameEnd bin */
        bin?: (msg.ISerialize|null);
    }

    /** Represents a BT_GameEnd. */
    class BT_GameEnd implements IBT_GameEnd {

        /**
         * Constructs a new BT_GameEnd.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBT_GameEnd);

        /** BT_GameEnd roomid. */
        public roomid: (number|Long);

        /** BT_GameEnd ownerid. */
        public ownerid: (number|Long);

        /** BT_GameEnd reason. */
        public reason: string;

        /** BT_GameEnd bin. */
        public bin?: (msg.ISerialize|null);

        /**
         * Creates a new BT_GameEnd instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BT_GameEnd instance
         */
        public static create(properties?: msg.IBT_GameEnd): msg.BT_GameEnd;

        /**
         * Encodes the specified BT_GameEnd message. Does not implicitly {@link msg.BT_GameEnd.verify|verify} messages.
         * @param message BT_GameEnd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBT_GameEnd, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BT_GameEnd message, length delimited. Does not implicitly {@link msg.BT_GameEnd.verify|verify} messages.
         * @param message BT_GameEnd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBT_GameEnd, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BT_GameEnd message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BT_GameEnd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BT_GameEnd;

        /**
         * Decodes a BT_GameEnd message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BT_GameEnd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BT_GameEnd;

        /**
         * Verifies a BT_GameEnd message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BT_GameEnd message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BT_GameEnd
         */
        public static fromObject(object: { [k: string]: any }): msg.BT_GameEnd;

        /**
         * Creates a plain object from a BT_GameEnd message. Also converts values to other types if specified.
         * @param message BT_GameEnd
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BT_GameEnd, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BT_GameEnd to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BT_GameOver. */
    interface IBT_GameOver {

        /** BT_GameOver roomid */
        roomid?: (number|Long|null);
    }

    /** Represents a BT_GameOver. */
    class BT_GameOver implements IBT_GameOver {

        /**
         * Constructs a new BT_GameOver.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBT_GameOver);

        /** BT_GameOver roomid. */
        public roomid: (number|Long);

        /**
         * Creates a new BT_GameOver instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BT_GameOver instance
         */
        public static create(properties?: msg.IBT_GameOver): msg.BT_GameOver;

        /**
         * Encodes the specified BT_GameOver message. Does not implicitly {@link msg.BT_GameOver.verify|verify} messages.
         * @param message BT_GameOver message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBT_GameOver, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BT_GameOver message, length delimited. Does not implicitly {@link msg.BT_GameOver.verify|verify} messages.
         * @param message BT_GameOver message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBT_GameOver, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BT_GameOver message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BT_GameOver
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BT_GameOver;

        /**
         * Decodes a BT_GameOver message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BT_GameOver
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BT_GameOver;

        /**
         * Verifies a BT_GameOver message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BT_GameOver message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BT_GameOver
         */
        public static fromObject(object: { [k: string]: any }): msg.BT_GameOver;

        /**
         * Creates a plain object from a BT_GameOver message. Also converts values to other types if specified.
         * @param message BT_GameOver
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BT_GameOver, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BT_GameOver to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BT_ReqQuitGameRoom. */
    interface IBT_ReqQuitGameRoom {

        /** BT_ReqQuitGameRoom roomid */
        roomid?: (number|Long|null);

        /** BT_ReqQuitGameRoom userid */
        userid?: (number|Long|null);

        /** BT_ReqQuitGameRoom gold */
        gold?: (number|null);
    }

    /** Represents a BT_ReqQuitGameRoom. */
    class BT_ReqQuitGameRoom implements IBT_ReqQuitGameRoom {

        /**
         * Constructs a new BT_ReqQuitGameRoom.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBT_ReqQuitGameRoom);

        /** BT_ReqQuitGameRoom roomid. */
        public roomid: (number|Long);

        /** BT_ReqQuitGameRoom userid. */
        public userid: (number|Long);

        /** BT_ReqQuitGameRoom gold. */
        public gold: number;

        /**
         * Creates a new BT_ReqQuitGameRoom instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BT_ReqQuitGameRoom instance
         */
        public static create(properties?: msg.IBT_ReqQuitGameRoom): msg.BT_ReqQuitGameRoom;

        /**
         * Encodes the specified BT_ReqQuitGameRoom message. Does not implicitly {@link msg.BT_ReqQuitGameRoom.verify|verify} messages.
         * @param message BT_ReqQuitGameRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBT_ReqQuitGameRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BT_ReqQuitGameRoom message, length delimited. Does not implicitly {@link msg.BT_ReqQuitGameRoom.verify|verify} messages.
         * @param message BT_ReqQuitGameRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBT_ReqQuitGameRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BT_ReqQuitGameRoom message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BT_ReqQuitGameRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BT_ReqQuitGameRoom;

        /**
         * Decodes a BT_ReqQuitGameRoom message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BT_ReqQuitGameRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BT_ReqQuitGameRoom;

        /**
         * Verifies a BT_ReqQuitGameRoom message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BT_ReqQuitGameRoom message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BT_ReqQuitGameRoom
         */
        public static fromObject(object: { [k: string]: any }): msg.BT_ReqQuitGameRoom;

        /**
         * Creates a plain object from a BT_ReqQuitGameRoom message. Also converts values to other types if specified.
         * @param message BT_ReqQuitGameRoom
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BT_ReqQuitGameRoom, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BT_ReqQuitGameRoom to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BT_PickItem. */
    interface IBT_PickItem {

        /** BT_PickItem userid */
        userid?: (number|Long|null);

        /** BT_PickItem item */
        item?: (msg.IGridItem|null);
    }

    /** Represents a BT_PickItem. */
    class BT_PickItem implements IBT_PickItem {

        /**
         * Constructs a new BT_PickItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBT_PickItem);

        /** BT_PickItem userid. */
        public userid: (number|Long);

        /** BT_PickItem item. */
        public item?: (msg.IGridItem|null);

        /**
         * Creates a new BT_PickItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BT_PickItem instance
         */
        public static create(properties?: msg.IBT_PickItem): msg.BT_PickItem;

        /**
         * Encodes the specified BT_PickItem message. Does not implicitly {@link msg.BT_PickItem.verify|verify} messages.
         * @param message BT_PickItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBT_PickItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BT_PickItem message, length delimited. Does not implicitly {@link msg.BT_PickItem.verify|verify} messages.
         * @param message BT_PickItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBT_PickItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BT_PickItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BT_PickItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BT_PickItem;

        /**
         * Decodes a BT_PickItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BT_PickItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BT_PickItem;

        /**
         * Verifies a BT_PickItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BT_PickItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BT_PickItem
         */
        public static fromObject(object: { [k: string]: any }): msg.BT_PickItem;

        /**
         * Creates a plain object from a BT_PickItem message. Also converts values to other types if specified.
         * @param message BT_PickItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BT_PickItem, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BT_PickItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BT_ReqLaunchBullet. */
    interface IBT_ReqLaunchBullet {

        /** BT_ReqLaunchBullet userid */
        userid?: (number|Long|null);
    }

    /** Represents a BT_ReqLaunchBullet. */
    class BT_ReqLaunchBullet implements IBT_ReqLaunchBullet {

        /**
         * Constructs a new BT_ReqLaunchBullet.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBT_ReqLaunchBullet);

        /** BT_ReqLaunchBullet userid. */
        public userid: (number|Long);

        /**
         * Creates a new BT_ReqLaunchBullet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BT_ReqLaunchBullet instance
         */
        public static create(properties?: msg.IBT_ReqLaunchBullet): msg.BT_ReqLaunchBullet;

        /**
         * Encodes the specified BT_ReqLaunchBullet message. Does not implicitly {@link msg.BT_ReqLaunchBullet.verify|verify} messages.
         * @param message BT_ReqLaunchBullet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBT_ReqLaunchBullet, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BT_ReqLaunchBullet message, length delimited. Does not implicitly {@link msg.BT_ReqLaunchBullet.verify|verify} messages.
         * @param message BT_ReqLaunchBullet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBT_ReqLaunchBullet, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BT_ReqLaunchBullet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BT_ReqLaunchBullet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BT_ReqLaunchBullet;

        /**
         * Decodes a BT_ReqLaunchBullet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BT_ReqLaunchBullet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BT_ReqLaunchBullet;

        /**
         * Verifies a BT_ReqLaunchBullet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BT_ReqLaunchBullet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BT_ReqLaunchBullet
         */
        public static fromObject(object: { [k: string]: any }): msg.BT_ReqLaunchBullet;

        /**
         * Creates a plain object from a BT_ReqLaunchBullet message. Also converts values to other types if specified.
         * @param message BT_ReqLaunchBullet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BT_ReqLaunchBullet, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BT_ReqLaunchBullet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BT_RetLaunchBullet. */
    interface IBT_RetLaunchBullet {

        /** BT_RetLaunchBullet bulletid */
        bulletid?: (number|Long|null);

        /** BT_RetLaunchBullet energy */
        energy?: (number|Long|null);

        /** BT_RetLaunchBullet errmsg */
        errmsg?: (string|null);
    }

    /** Represents a BT_RetLaunchBullet. */
    class BT_RetLaunchBullet implements IBT_RetLaunchBullet {

        /**
         * Constructs a new BT_RetLaunchBullet.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBT_RetLaunchBullet);

        /** BT_RetLaunchBullet bulletid. */
        public bulletid: (number|Long);

        /** BT_RetLaunchBullet energy. */
        public energy: (number|Long);

        /** BT_RetLaunchBullet errmsg. */
        public errmsg: string;

        /**
         * Creates a new BT_RetLaunchBullet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BT_RetLaunchBullet instance
         */
        public static create(properties?: msg.IBT_RetLaunchBullet): msg.BT_RetLaunchBullet;

        /**
         * Encodes the specified BT_RetLaunchBullet message. Does not implicitly {@link msg.BT_RetLaunchBullet.verify|verify} messages.
         * @param message BT_RetLaunchBullet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBT_RetLaunchBullet, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BT_RetLaunchBullet message, length delimited. Does not implicitly {@link msg.BT_RetLaunchBullet.verify|verify} messages.
         * @param message BT_RetLaunchBullet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBT_RetLaunchBullet, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BT_RetLaunchBullet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BT_RetLaunchBullet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BT_RetLaunchBullet;

        /**
         * Decodes a BT_RetLaunchBullet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BT_RetLaunchBullet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BT_RetLaunchBullet;

        /**
         * Verifies a BT_RetLaunchBullet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BT_RetLaunchBullet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BT_RetLaunchBullet
         */
        public static fromObject(object: { [k: string]: any }): msg.BT_RetLaunchBullet;

        /**
         * Creates a plain object from a BT_RetLaunchBullet message. Also converts values to other types if specified.
         * @param message BT_RetLaunchBullet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BT_RetLaunchBullet, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BT_RetLaunchBullet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BT_StepOnBomb. */
    interface IBT_StepOnBomb {

        /** BT_StepOnBomb userid */
        userid?: (number|Long|null);
    }

    /** Represents a BT_StepOnBomb. */
    class BT_StepOnBomb implements IBT_StepOnBomb {

        /**
         * Constructs a new BT_StepOnBomb.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBT_StepOnBomb);

        /** BT_StepOnBomb userid. */
        public userid: (number|Long);

        /**
         * Creates a new BT_StepOnBomb instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BT_StepOnBomb instance
         */
        public static create(properties?: msg.IBT_StepOnBomb): msg.BT_StepOnBomb;

        /**
         * Encodes the specified BT_StepOnBomb message. Does not implicitly {@link msg.BT_StepOnBomb.verify|verify} messages.
         * @param message BT_StepOnBomb message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBT_StepOnBomb, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BT_StepOnBomb message, length delimited. Does not implicitly {@link msg.BT_StepOnBomb.verify|verify} messages.
         * @param message BT_StepOnBomb message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBT_StepOnBomb, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BT_StepOnBomb message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BT_StepOnBomb
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BT_StepOnBomb;

        /**
         * Decodes a BT_StepOnBomb message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BT_StepOnBomb
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BT_StepOnBomb;

        /**
         * Verifies a BT_StepOnBomb message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BT_StepOnBomb message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BT_StepOnBomb
         */
        public static fromObject(object: { [k: string]: any }): msg.BT_StepOnBomb;

        /**
         * Creates a plain object from a BT_StepOnBomb message. Also converts values to other types if specified.
         * @param message BT_StepOnBomb
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BT_StepOnBomb, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BT_StepOnBomb to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BT_RetStepOnBomb. */
    interface IBT_RetStepOnBomb {
    }

    /** Represents a BT_RetStepOnBomb. */
    class BT_RetStepOnBomb implements IBT_RetStepOnBomb {

        /**
         * Constructs a new BT_RetStepOnBomb.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBT_RetStepOnBomb);

        /**
         * Creates a new BT_RetStepOnBomb instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BT_RetStepOnBomb instance
         */
        public static create(properties?: msg.IBT_RetStepOnBomb): msg.BT_RetStepOnBomb;

        /**
         * Encodes the specified BT_RetStepOnBomb message. Does not implicitly {@link msg.BT_RetStepOnBomb.verify|verify} messages.
         * @param message BT_RetStepOnBomb message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBT_RetStepOnBomb, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BT_RetStepOnBomb message, length delimited. Does not implicitly {@link msg.BT_RetStepOnBomb.verify|verify} messages.
         * @param message BT_RetStepOnBomb message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBT_RetStepOnBomb, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BT_RetStepOnBomb message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BT_RetStepOnBomb
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BT_RetStepOnBomb;

        /**
         * Decodes a BT_RetStepOnBomb message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BT_RetStepOnBomb
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BT_RetStepOnBomb;

        /**
         * Verifies a BT_RetStepOnBomb message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BT_RetStepOnBomb message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BT_RetStepOnBomb
         */
        public static fromObject(object: { [k: string]: any }): msg.BT_RetStepOnBomb;

        /**
         * Creates a plain object from a BT_RetStepOnBomb message. Also converts values to other types if specified.
         * @param message BT_RetStepOnBomb
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BT_RetStepOnBomb, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BT_RetStepOnBomb to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BT_BulletEarnMoney. */
    interface IBT_BulletEarnMoney {

        /** BT_BulletEarnMoney userid */
        userid?: (number|Long|null);

        /** BT_BulletEarnMoney bulletid */
        bulletid?: (number|Long|null);

        /** BT_BulletEarnMoney gold */
        gold?: (number|null);
    }

    /** Represents a BT_BulletEarnMoney. */
    class BT_BulletEarnMoney implements IBT_BulletEarnMoney {

        /**
         * Constructs a new BT_BulletEarnMoney.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBT_BulletEarnMoney);

        /** BT_BulletEarnMoney userid. */
        public userid: (number|Long);

        /** BT_BulletEarnMoney bulletid. */
        public bulletid: (number|Long);

        /** BT_BulletEarnMoney gold. */
        public gold: number;

        /**
         * Creates a new BT_BulletEarnMoney instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BT_BulletEarnMoney instance
         */
        public static create(properties?: msg.IBT_BulletEarnMoney): msg.BT_BulletEarnMoney;

        /**
         * Encodes the specified BT_BulletEarnMoney message. Does not implicitly {@link msg.BT_BulletEarnMoney.verify|verify} messages.
         * @param message BT_BulletEarnMoney message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBT_BulletEarnMoney, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BT_BulletEarnMoney message, length delimited. Does not implicitly {@link msg.BT_BulletEarnMoney.verify|verify} messages.
         * @param message BT_BulletEarnMoney message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBT_BulletEarnMoney, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BT_BulletEarnMoney message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BT_BulletEarnMoney
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BT_BulletEarnMoney;

        /**
         * Decodes a BT_BulletEarnMoney message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BT_BulletEarnMoney
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BT_BulletEarnMoney;

        /**
         * Verifies a BT_BulletEarnMoney message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BT_BulletEarnMoney message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BT_BulletEarnMoney
         */
        public static fromObject(object: { [k: string]: any }): msg.BT_BulletEarnMoney;

        /**
         * Creates a plain object from a BT_BulletEarnMoney message. Also converts values to other types if specified.
         * @param message BT_BulletEarnMoney
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BT_BulletEarnMoney, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BT_BulletEarnMoney to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BT_UseUltimateSkil. */
    interface IBT_UseUltimateSkil {

        /** BT_UseUltimateSkil userid */
        userid?: (number|Long|null);

        /** BT_UseUltimateSkil gold */
        gold?: (number|null);
    }

    /** Represents a BT_UseUltimateSkil. */
    class BT_UseUltimateSkil implements IBT_UseUltimateSkil {

        /**
         * Constructs a new BT_UseUltimateSkil.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBT_UseUltimateSkil);

        /** BT_UseUltimateSkil userid. */
        public userid: (number|Long);

        /** BT_UseUltimateSkil gold. */
        public gold: number;

        /**
         * Creates a new BT_UseUltimateSkil instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BT_UseUltimateSkil instance
         */
        public static create(properties?: msg.IBT_UseUltimateSkil): msg.BT_UseUltimateSkil;

        /**
         * Encodes the specified BT_UseUltimateSkil message. Does not implicitly {@link msg.BT_UseUltimateSkil.verify|verify} messages.
         * @param message BT_UseUltimateSkil message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBT_UseUltimateSkil, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BT_UseUltimateSkil message, length delimited. Does not implicitly {@link msg.BT_UseUltimateSkil.verify|verify} messages.
         * @param message BT_UseUltimateSkil message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBT_UseUltimateSkil, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BT_UseUltimateSkil message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BT_UseUltimateSkil
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BT_UseUltimateSkil;

        /**
         * Decodes a BT_UseUltimateSkil message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BT_UseUltimateSkil
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BT_UseUltimateSkil;

        /**
         * Verifies a BT_UseUltimateSkil message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BT_UseUltimateSkil message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BT_UseUltimateSkil
         */
        public static fromObject(object: { [k: string]: any }): msg.BT_UseUltimateSkil;

        /**
         * Creates a plain object from a BT_UseUltimateSkil message. Also converts values to other types if specified.
         * @param message BT_UseUltimateSkil
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BT_UseUltimateSkil, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BT_UseUltimateSkil to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BT_ReqCrushSuperBrick. */
    interface IBT_ReqCrushSuperBrick {

        /** BT_ReqCrushSuperBrick userid */
        userid?: (number|Long|null);
    }

    /** Represents a BT_ReqCrushSuperBrick. */
    class BT_ReqCrushSuperBrick implements IBT_ReqCrushSuperBrick {

        /**
         * Constructs a new BT_ReqCrushSuperBrick.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBT_ReqCrushSuperBrick);

        /** BT_ReqCrushSuperBrick userid. */
        public userid: (number|Long);

        /**
         * Creates a new BT_ReqCrushSuperBrick instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BT_ReqCrushSuperBrick instance
         */
        public static create(properties?: msg.IBT_ReqCrushSuperBrick): msg.BT_ReqCrushSuperBrick;

        /**
         * Encodes the specified BT_ReqCrushSuperBrick message. Does not implicitly {@link msg.BT_ReqCrushSuperBrick.verify|verify} messages.
         * @param message BT_ReqCrushSuperBrick message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBT_ReqCrushSuperBrick, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BT_ReqCrushSuperBrick message, length delimited. Does not implicitly {@link msg.BT_ReqCrushSuperBrick.verify|verify} messages.
         * @param message BT_ReqCrushSuperBrick message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBT_ReqCrushSuperBrick, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BT_ReqCrushSuperBrick message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BT_ReqCrushSuperBrick
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BT_ReqCrushSuperBrick;

        /**
         * Decodes a BT_ReqCrushSuperBrick message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BT_ReqCrushSuperBrick
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BT_ReqCrushSuperBrick;

        /**
         * Verifies a BT_ReqCrushSuperBrick message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BT_ReqCrushSuperBrick message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BT_ReqCrushSuperBrick
         */
        public static fromObject(object: { [k: string]: any }): msg.BT_ReqCrushSuperBrick;

        /**
         * Creates a plain object from a BT_ReqCrushSuperBrick message. Also converts values to other types if specified.
         * @param message BT_ReqCrushSuperBrick
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BT_ReqCrushSuperBrick, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BT_ReqCrushSuperBrick to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BT_RetCrushSuperBrick. */
    interface IBT_RetCrushSuperBrick {

        /** BT_RetCrushSuperBrick errmsg */
        errmsg?: (string|null);
    }

    /** Represents a BT_RetCrushSuperBrick. */
    class BT_RetCrushSuperBrick implements IBT_RetCrushSuperBrick {

        /**
         * Constructs a new BT_RetCrushSuperBrick.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBT_RetCrushSuperBrick);

        /** BT_RetCrushSuperBrick errmsg. */
        public errmsg: string;

        /**
         * Creates a new BT_RetCrushSuperBrick instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BT_RetCrushSuperBrick instance
         */
        public static create(properties?: msg.IBT_RetCrushSuperBrick): msg.BT_RetCrushSuperBrick;

        /**
         * Encodes the specified BT_RetCrushSuperBrick message. Does not implicitly {@link msg.BT_RetCrushSuperBrick.verify|verify} messages.
         * @param message BT_RetCrushSuperBrick message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBT_RetCrushSuperBrick, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BT_RetCrushSuperBrick message, length delimited. Does not implicitly {@link msg.BT_RetCrushSuperBrick.verify|verify} messages.
         * @param message BT_RetCrushSuperBrick message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBT_RetCrushSuperBrick, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BT_RetCrushSuperBrick message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BT_RetCrushSuperBrick
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BT_RetCrushSuperBrick;

        /**
         * Decodes a BT_RetCrushSuperBrick message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BT_RetCrushSuperBrick
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BT_RetCrushSuperBrick;

        /**
         * Verifies a BT_RetCrushSuperBrick message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BT_RetCrushSuperBrick message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BT_RetCrushSuperBrick
         */
        public static fromObject(object: { [k: string]: any }): msg.BT_RetCrushSuperBrick;

        /**
         * Creates a plain object from a BT_RetCrushSuperBrick message. Also converts values to other types if specified.
         * @param message BT_RetCrushSuperBrick
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BT_RetCrushSuperBrick, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BT_RetCrushSuperBrick to JSON.
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

        /** EntityBase face */
        face?: (string|null);

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

        /** EntityBase face. */
        public face: string;

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

    /** Properties of an ImageData. */
    interface IImageData {

        /** ImageData sex */
        sex?: (number|null);

        /** ImageData clothes */
        clothes?: (msg.IItemData[]|null);
    }

    /** Represents an ImageData. */
    class ImageData implements IImageData {

        /**
         * Constructs a new ImageData.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IImageData);

        /** ImageData sex. */
        public sex: number;

        /** ImageData clothes. */
        public clothes: msg.IItemData[];

        /**
         * Creates a new ImageData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ImageData instance
         */
        public static create(properties?: msg.IImageData): msg.ImageData;

        /**
         * Encodes the specified ImageData message. Does not implicitly {@link msg.ImageData.verify|verify} messages.
         * @param message ImageData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IImageData, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified ImageData message, length delimited. Does not implicitly {@link msg.ImageData.verify|verify} messages.
         * @param message ImageData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IImageData, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an ImageData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ImageData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.ImageData;

        /**
         * Decodes an ImageData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ImageData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.ImageData;

        /**
         * Verifies an ImageData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ImageData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ImageData
         */
        public static fromObject(object: { [k: string]: any }): msg.ImageData;

        /**
         * Creates a plain object from an ImageData message. Also converts values to other types if specified.
         * @param message ImageData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.ImageData, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ImageData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PersonalImage. */
    interface IPersonalImage {

        /** PersonalImage lists */
        lists?: (msg.IImageData[]|null);
    }

    /** Represents a PersonalImage. */
    class PersonalImage implements IPersonalImage {

        /**
         * Constructs a new PersonalImage.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IPersonalImage);

        /** PersonalImage lists. */
        public lists: msg.IImageData[];

        /**
         * Creates a new PersonalImage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PersonalImage instance
         */
        public static create(properties?: msg.IPersonalImage): msg.PersonalImage;

        /**
         * Encodes the specified PersonalImage message. Does not implicitly {@link msg.PersonalImage.verify|verify} messages.
         * @param message PersonalImage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IPersonalImage, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified PersonalImage message, length delimited. Does not implicitly {@link msg.PersonalImage.verify|verify} messages.
         * @param message PersonalImage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IPersonalImage, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a PersonalImage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PersonalImage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.PersonalImage;

        /**
         * Decodes a PersonalImage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PersonalImage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.PersonalImage;

        /**
         * Verifies a PersonalImage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PersonalImage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PersonalImage
         */
        public static fromObject(object: { [k: string]: any }): msg.PersonalImage;

        /**
         * Creates a plain object from a PersonalImage message. Also converts values to other types if specified.
         * @param message PersonalImage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.PersonalImage, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PersonalImage to JSON.
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

        /** UserBase addrlist */
        addrlist?: (msg.IUserAddress[]|null);

        /** UserBase scounter */
        scounter?: (msg.ISimpleCounter|null);

        /** UserBase wechat */
        wechat?: (msg.IUserWechat|null);

        /** UserBase invitationcode */
        invitationcode?: (string|null);

        /** UserBase freepresent */
        freepresent?: (msg.IFreePresentMoney|null);

        /** UserBase task */
        task?: (msg.IUserTask|null);

        /** UserBase luckydraw */
        luckydraw?: (msg.ILuckyDrawRecord|null);

        /** UserBase totalRecharge */
        totalRecharge?: (number|null);

        /** UserBase images */
        images?: (msg.IPersonalImage|null);
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

        /** UserBase addrlist. */
        public addrlist: msg.IUserAddress[];

        /** UserBase scounter. */
        public scounter?: (msg.ISimpleCounter|null);

        /** UserBase wechat. */
        public wechat?: (msg.IUserWechat|null);

        /** UserBase invitationcode. */
        public invitationcode: string;

        /** UserBase freepresent. */
        public freepresent?: (msg.IFreePresentMoney|null);

        /** UserBase task. */
        public task?: (msg.IUserTask|null);

        /** UserBase luckydraw. */
        public luckydraw?: (msg.ILuckyDrawRecord|null);

        /** UserBase totalRecharge. */
        public totalRecharge: number;

        /** UserBase images. */
        public images?: (msg.IPersonalImage|null);

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

    /** Properties of a C2GW_ReqLogin. */
    interface IC2GW_ReqLogin {

        /** C2GW_ReqLogin account */
        account?: (string|null);

        /** C2GW_ReqLogin verifykey */
        verifykey?: (string|null);

        /** C2GW_ReqLogin token */
        token?: (string|null);

        /** C2GW_ReqLogin face */
        face?: (string|null);
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

        /** C2GW_ReqLogin face. */
        public face: string;

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

    /** Properties of a GW2C_SendUserInfo. */
    interface IGW2C_SendUserInfo {

        /** GW2C_SendUserInfo entity */
        entity?: (msg.IEntityBase|null);

        /** GW2C_SendUserInfo base */
        base?: (msg.IUserBase|null);

        /** GW2C_SendUserInfo item */
        item?: (msg.IItemBin|null);
    }

    /** Represents a GW2C_SendUserInfo. */
    class GW2C_SendUserInfo implements IGW2C_SendUserInfo {

        /**
         * Constructs a new GW2C_SendUserInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_SendUserInfo);

        /** GW2C_SendUserInfo entity. */
        public entity?: (msg.IEntityBase|null);

        /** GW2C_SendUserInfo base. */
        public base?: (msg.IUserBase|null);

        /** GW2C_SendUserInfo item. */
        public item?: (msg.IItemBin|null);

        /**
         * Creates a new GW2C_SendUserInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_SendUserInfo instance
         */
        public static create(properties?: msg.IGW2C_SendUserInfo): msg.GW2C_SendUserInfo;

        /**
         * Encodes the specified GW2C_SendUserInfo message. Does not implicitly {@link msg.GW2C_SendUserInfo.verify|verify} messages.
         * @param message GW2C_SendUserInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_SendUserInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_SendUserInfo message, length delimited. Does not implicitly {@link msg.GW2C_SendUserInfo.verify|verify} messages.
         * @param message GW2C_SendUserInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_SendUserInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_SendUserInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_SendUserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_SendUserInfo;

        /**
         * Decodes a GW2C_SendUserInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_SendUserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_SendUserInfo;

        /**
         * Verifies a GW2C_SendUserInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_SendUserInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_SendUserInfo
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_SendUserInfo;

        /**
         * Creates a plain object from a GW2C_SendUserInfo message. Also converts values to other types if specified.
         * @param message GW2C_SendUserInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_SendUserInfo, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_SendUserInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_SendUserPlatformMoney. */
    interface IGW2C_SendUserPlatformMoney {

        /** GW2C_SendUserPlatformMoney coins */
        coins?: (number|null);
    }

    /** Represents a GW2C_SendUserPlatformMoney. */
    class GW2C_SendUserPlatformMoney implements IGW2C_SendUserPlatformMoney {

        /**
         * Constructs a new GW2C_SendUserPlatformMoney.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_SendUserPlatformMoney);

        /** GW2C_SendUserPlatformMoney coins. */
        public coins: number;

        /**
         * Creates a new GW2C_SendUserPlatformMoney instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_SendUserPlatformMoney instance
         */
        public static create(properties?: msg.IGW2C_SendUserPlatformMoney): msg.GW2C_SendUserPlatformMoney;

        /**
         * Encodes the specified GW2C_SendUserPlatformMoney message. Does not implicitly {@link msg.GW2C_SendUserPlatformMoney.verify|verify} messages.
         * @param message GW2C_SendUserPlatformMoney message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_SendUserPlatformMoney, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_SendUserPlatformMoney message, length delimited. Does not implicitly {@link msg.GW2C_SendUserPlatformMoney.verify|verify} messages.
         * @param message GW2C_SendUserPlatformMoney message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_SendUserPlatformMoney, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_SendUserPlatformMoney message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_SendUserPlatformMoney
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_SendUserPlatformMoney;

        /**
         * Decodes a GW2C_SendUserPlatformMoney message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_SendUserPlatformMoney
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_SendUserPlatformMoney;

        /**
         * Verifies a GW2C_SendUserPlatformMoney message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_SendUserPlatformMoney message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_SendUserPlatformMoney
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_SendUserPlatformMoney;

        /**
         * Creates a plain object from a GW2C_SendUserPlatformMoney message. Also converts values to other types if specified.
         * @param message GW2C_SendUserPlatformMoney
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_SendUserPlatformMoney, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_SendUserPlatformMoney to JSON.
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

    /** Properties of a C2GW_ReqStartGame. */
    interface IC2GW_ReqStartGame {

        /** C2GW_ReqStartGame gamekind */
        gamekind?: (number|null);
    }

    /** Represents a C2GW_ReqStartGame. */
    class C2GW_ReqStartGame implements IC2GW_ReqStartGame {

        /**
         * Constructs a new C2GW_ReqStartGame.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_ReqStartGame);

        /** C2GW_ReqStartGame gamekind. */
        public gamekind: number;

        /**
         * Creates a new C2GW_ReqStartGame instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_ReqStartGame instance
         */
        public static create(properties?: msg.IC2GW_ReqStartGame): msg.C2GW_ReqStartGame;

        /**
         * Encodes the specified C2GW_ReqStartGame message. Does not implicitly {@link msg.C2GW_ReqStartGame.verify|verify} messages.
         * @param message C2GW_ReqStartGame message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_ReqStartGame, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_ReqStartGame message, length delimited. Does not implicitly {@link msg.C2GW_ReqStartGame.verify|verify} messages.
         * @param message C2GW_ReqStartGame message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_ReqStartGame, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_ReqStartGame message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_ReqStartGame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_ReqStartGame;

        /**
         * Decodes a C2GW_ReqStartGame message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_ReqStartGame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_ReqStartGame;

        /**
         * Verifies a C2GW_ReqStartGame message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_ReqStartGame message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_ReqStartGame
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_ReqStartGame;

        /**
         * Creates a plain object from a C2GW_ReqStartGame message. Also converts values to other types if specified.
         * @param message C2GW_ReqStartGame
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_ReqStartGame, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_ReqStartGame to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_RetStartGame. */
    interface IGW2C_RetStartGame {

        /** GW2C_RetStartGame errcode */
        errcode?: (string|null);

        /** GW2C_RetStartGame roomid */
        roomid?: (number|Long|null);
    }

    /** Represents a GW2C_RetStartGame. */
    class GW2C_RetStartGame implements IGW2C_RetStartGame {

        /**
         * Constructs a new GW2C_RetStartGame.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_RetStartGame);

        /** GW2C_RetStartGame errcode. */
        public errcode: string;

        /** GW2C_RetStartGame roomid. */
        public roomid: (number|Long);

        /**
         * Creates a new GW2C_RetStartGame instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_RetStartGame instance
         */
        public static create(properties?: msg.IGW2C_RetStartGame): msg.GW2C_RetStartGame;

        /**
         * Encodes the specified GW2C_RetStartGame message. Does not implicitly {@link msg.GW2C_RetStartGame.verify|verify} messages.
         * @param message GW2C_RetStartGame message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_RetStartGame, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_RetStartGame message, length delimited. Does not implicitly {@link msg.GW2C_RetStartGame.verify|verify} messages.
         * @param message GW2C_RetStartGame message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_RetStartGame, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_RetStartGame message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_RetStartGame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_RetStartGame;

        /**
         * Decodes a GW2C_RetStartGame message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_RetStartGame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_RetStartGame;

        /**
         * Verifies a GW2C_RetStartGame message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_RetStartGame message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_RetStartGame
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_RetStartGame;

        /**
         * Creates a plain object from a GW2C_RetStartGame message. Also converts values to other types if specified.
         * @param message GW2C_RetStartGame
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_RetStartGame, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_RetStartGame to JSON.
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

        /** C2L_ReqLoginWechat face */
        face?: (string|null);

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

        /** C2L_ReqLoginWechat face. */
        public face: string;

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
        YuanBao = 6001,
        Diamond = 6002,
        Gold = 6003,
        FreeStep = 6005,
        RedDiamond = 10001,
        RedDiamondParts = 10002
    }

    /** ItemType enum. */
    enum ItemType {
        Digital = 1,
        ShoppingCard = 2,
        DailyUse = 3,
        Toy = 4,
        MobileCard = 5,
        Currency = 6,
        CarAccessory = 7,
        Advertisement = 8,
        Smallware = 9,
        DiamondItem = 10
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

    /** Sex enum. */
    enum Sex {
        Female = 0,
        Male = 1,
        Neutral = 2
    }

    /** MoneyType enum. */
    enum MoneyType {
        _Gold = 1,
        _Diamond = 2
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

    /** Properties of a GW2MS_ReqCreateRoom. */
    interface IGW2MS_ReqCreateRoom {

        /** GW2MS_ReqCreateRoom userid */
        userid?: (number|Long|null);

        /** GW2MS_ReqCreateRoom gamekind */
        gamekind?: (number|null);
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

    /** Properties of a GW2RS_MsgTransfer. */
    interface IGW2RS_MsgTransfer {

        /** GW2RS_MsgTransfer uid */
        uid?: (number|Long|null);

        /** GW2RS_MsgTransfer name */
        name?: (string|null);

        /** GW2RS_MsgTransfer buf */
        buf?: (Uint8Array|null);
    }

    /** Represents a GW2RS_MsgTransfer. */
    class GW2RS_MsgTransfer implements IGW2RS_MsgTransfer {

        /**
         * Constructs a new GW2RS_MsgTransfer.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2RS_MsgTransfer);

        /** GW2RS_MsgTransfer uid. */
        public uid: (number|Long);

        /** GW2RS_MsgTransfer name. */
        public name: string;

        /** GW2RS_MsgTransfer buf. */
        public buf: Uint8Array;

        /**
         * Creates a new GW2RS_MsgTransfer instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2RS_MsgTransfer instance
         */
        public static create(properties?: msg.IGW2RS_MsgTransfer): msg.GW2RS_MsgTransfer;

        /**
         * Encodes the specified GW2RS_MsgTransfer message. Does not implicitly {@link msg.GW2RS_MsgTransfer.verify|verify} messages.
         * @param message GW2RS_MsgTransfer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2RS_MsgTransfer, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2RS_MsgTransfer message, length delimited. Does not implicitly {@link msg.GW2RS_MsgTransfer.verify|verify} messages.
         * @param message GW2RS_MsgTransfer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2RS_MsgTransfer, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2RS_MsgTransfer message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2RS_MsgTransfer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2RS_MsgTransfer;

        /**
         * Decodes a GW2RS_MsgTransfer message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2RS_MsgTransfer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2RS_MsgTransfer;

        /**
         * Verifies a GW2RS_MsgTransfer message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2RS_MsgTransfer message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2RS_MsgTransfer
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2RS_MsgTransfer;

        /**
         * Creates a plain object from a GW2RS_MsgTransfer message. Also converts values to other types if specified.
         * @param message GW2RS_MsgTransfer
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2RS_MsgTransfer, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2RS_MsgTransfer to JSON.
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

    /** Properties of a GW2C_AddPackageItem. */
    interface IGW2C_AddPackageItem {

        /** GW2C_AddPackageItem itemid */
        itemid?: (number|null);

        /** GW2C_AddPackageItem num */
        num?: (number|null);
    }

    /** Represents a GW2C_AddPackageItem. */
    class GW2C_AddPackageItem implements IGW2C_AddPackageItem {

        /**
         * Constructs a new GW2C_AddPackageItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_AddPackageItem);

        /** GW2C_AddPackageItem itemid. */
        public itemid: number;

        /** GW2C_AddPackageItem num. */
        public num: number;

        /**
         * Creates a new GW2C_AddPackageItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_AddPackageItem instance
         */
        public static create(properties?: msg.IGW2C_AddPackageItem): msg.GW2C_AddPackageItem;

        /**
         * Encodes the specified GW2C_AddPackageItem message. Does not implicitly {@link msg.GW2C_AddPackageItem.verify|verify} messages.
         * @param message GW2C_AddPackageItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_AddPackageItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_AddPackageItem message, length delimited. Does not implicitly {@link msg.GW2C_AddPackageItem.verify|verify} messages.
         * @param message GW2C_AddPackageItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_AddPackageItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_AddPackageItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_AddPackageItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_AddPackageItem;

        /**
         * Decodes a GW2C_AddPackageItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_AddPackageItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_AddPackageItem;

        /**
         * Verifies a GW2C_AddPackageItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_AddPackageItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_AddPackageItem
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_AddPackageItem;

        /**
         * Creates a plain object from a GW2C_AddPackageItem message. Also converts values to other types if specified.
         * @param message GW2C_AddPackageItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_AddPackageItem, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_AddPackageItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_RemovePackageItem. */
    interface IGW2C_RemovePackageItem {

        /** GW2C_RemovePackageItem itemid */
        itemid?: (number|null);

        /** GW2C_RemovePackageItem num */
        num?: (number|null);
    }

    /** Represents a GW2C_RemovePackageItem. */
    class GW2C_RemovePackageItem implements IGW2C_RemovePackageItem {

        /**
         * Constructs a new GW2C_RemovePackageItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_RemovePackageItem);

        /** GW2C_RemovePackageItem itemid. */
        public itemid: number;

        /** GW2C_RemovePackageItem num. */
        public num: number;

        /**
         * Creates a new GW2C_RemovePackageItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_RemovePackageItem instance
         */
        public static create(properties?: msg.IGW2C_RemovePackageItem): msg.GW2C_RemovePackageItem;

        /**
         * Encodes the specified GW2C_RemovePackageItem message. Does not implicitly {@link msg.GW2C_RemovePackageItem.verify|verify} messages.
         * @param message GW2C_RemovePackageItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_RemovePackageItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_RemovePackageItem message, length delimited. Does not implicitly {@link msg.GW2C_RemovePackageItem.verify|verify} messages.
         * @param message GW2C_RemovePackageItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_RemovePackageItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_RemovePackageItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_RemovePackageItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_RemovePackageItem;

        /**
         * Decodes a GW2C_RemovePackageItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_RemovePackageItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_RemovePackageItem;

        /**
         * Verifies a GW2C_RemovePackageItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_RemovePackageItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_RemovePackageItem
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_RemovePackageItem;

        /**
         * Creates a plain object from a GW2C_RemovePackageItem message. Also converts values to other types if specified.
         * @param message GW2C_RemovePackageItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_RemovePackageItem, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_RemovePackageItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_UpdateGold. */
    interface IGW2C_UpdateGold {

        /** GW2C_UpdateGold num */
        num?: (number|null);
    }

    /** Represents a GW2C_UpdateGold. */
    class GW2C_UpdateGold implements IGW2C_UpdateGold {

        /**
         * Constructs a new GW2C_UpdateGold.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_UpdateGold);

        /** GW2C_UpdateGold num. */
        public num: number;

        /**
         * Creates a new GW2C_UpdateGold instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_UpdateGold instance
         */
        public static create(properties?: msg.IGW2C_UpdateGold): msg.GW2C_UpdateGold;

        /**
         * Encodes the specified GW2C_UpdateGold message. Does not implicitly {@link msg.GW2C_UpdateGold.verify|verify} messages.
         * @param message GW2C_UpdateGold message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_UpdateGold, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_UpdateGold message, length delimited. Does not implicitly {@link msg.GW2C_UpdateGold.verify|verify} messages.
         * @param message GW2C_UpdateGold message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_UpdateGold, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_UpdateGold message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_UpdateGold
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_UpdateGold;

        /**
         * Decodes a GW2C_UpdateGold message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_UpdateGold
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_UpdateGold;

        /**
         * Verifies a GW2C_UpdateGold message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_UpdateGold message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_UpdateGold
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_UpdateGold;

        /**
         * Creates a plain object from a GW2C_UpdateGold message. Also converts values to other types if specified.
         * @param message GW2C_UpdateGold
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_UpdateGold, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_UpdateGold to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_UpdateYuanbao. */
    interface IGW2C_UpdateYuanbao {

        /** GW2C_UpdateYuanbao num */
        num?: (number|null);
    }

    /** Represents a GW2C_UpdateYuanbao. */
    class GW2C_UpdateYuanbao implements IGW2C_UpdateYuanbao {

        /**
         * Constructs a new GW2C_UpdateYuanbao.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_UpdateYuanbao);

        /** GW2C_UpdateYuanbao num. */
        public num: number;

        /**
         * Creates a new GW2C_UpdateYuanbao instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_UpdateYuanbao instance
         */
        public static create(properties?: msg.IGW2C_UpdateYuanbao): msg.GW2C_UpdateYuanbao;

        /**
         * Encodes the specified GW2C_UpdateYuanbao message. Does not implicitly {@link msg.GW2C_UpdateYuanbao.verify|verify} messages.
         * @param message GW2C_UpdateYuanbao message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_UpdateYuanbao, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_UpdateYuanbao message, length delimited. Does not implicitly {@link msg.GW2C_UpdateYuanbao.verify|verify} messages.
         * @param message GW2C_UpdateYuanbao message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_UpdateYuanbao, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_UpdateYuanbao message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_UpdateYuanbao
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_UpdateYuanbao;

        /**
         * Decodes a GW2C_UpdateYuanbao message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_UpdateYuanbao
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_UpdateYuanbao;

        /**
         * Verifies a GW2C_UpdateYuanbao message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_UpdateYuanbao message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_UpdateYuanbao
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_UpdateYuanbao;

        /**
         * Creates a plain object from a GW2C_UpdateYuanbao message. Also converts values to other types if specified.
         * @param message GW2C_UpdateYuanbao
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_UpdateYuanbao, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_UpdateYuanbao to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_UpdateDiamond. */
    interface IGW2C_UpdateDiamond {

        /** GW2C_UpdateDiamond num */
        num?: (number|null);
    }

    /** Represents a GW2C_UpdateDiamond. */
    class GW2C_UpdateDiamond implements IGW2C_UpdateDiamond {

        /**
         * Constructs a new GW2C_UpdateDiamond.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_UpdateDiamond);

        /** GW2C_UpdateDiamond num. */
        public num: number;

        /**
         * Creates a new GW2C_UpdateDiamond instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_UpdateDiamond instance
         */
        public static create(properties?: msg.IGW2C_UpdateDiamond): msg.GW2C_UpdateDiamond;

        /**
         * Encodes the specified GW2C_UpdateDiamond message. Does not implicitly {@link msg.GW2C_UpdateDiamond.verify|verify} messages.
         * @param message GW2C_UpdateDiamond message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_UpdateDiamond, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_UpdateDiamond message, length delimited. Does not implicitly {@link msg.GW2C_UpdateDiamond.verify|verify} messages.
         * @param message GW2C_UpdateDiamond message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_UpdateDiamond, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_UpdateDiamond message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_UpdateDiamond
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_UpdateDiamond;

        /**
         * Decodes a GW2C_UpdateDiamond message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_UpdateDiamond
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_UpdateDiamond;

        /**
         * Verifies a GW2C_UpdateDiamond message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_UpdateDiamond message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_UpdateDiamond
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_UpdateDiamond;

        /**
         * Creates a plain object from a GW2C_UpdateDiamond message. Also converts values to other types if specified.
         * @param message GW2C_UpdateDiamond
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_UpdateDiamond, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_UpdateDiamond to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_UpdateFreeStep. */
    interface IGW2C_UpdateFreeStep {

        /** GW2C_UpdateFreeStep num */
        num?: (number|null);
    }

    /** Represents a GW2C_UpdateFreeStep. */
    class GW2C_UpdateFreeStep implements IGW2C_UpdateFreeStep {

        /**
         * Constructs a new GW2C_UpdateFreeStep.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_UpdateFreeStep);

        /** GW2C_UpdateFreeStep num. */
        public num: number;

        /**
         * Creates a new GW2C_UpdateFreeStep instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_UpdateFreeStep instance
         */
        public static create(properties?: msg.IGW2C_UpdateFreeStep): msg.GW2C_UpdateFreeStep;

        /**
         * Encodes the specified GW2C_UpdateFreeStep message. Does not implicitly {@link msg.GW2C_UpdateFreeStep.verify|verify} messages.
         * @param message GW2C_UpdateFreeStep message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_UpdateFreeStep, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_UpdateFreeStep message, length delimited. Does not implicitly {@link msg.GW2C_UpdateFreeStep.verify|verify} messages.
         * @param message GW2C_UpdateFreeStep message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_UpdateFreeStep, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_UpdateFreeStep message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_UpdateFreeStep
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_UpdateFreeStep;

        /**
         * Decodes a GW2C_UpdateFreeStep message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_UpdateFreeStep
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_UpdateFreeStep;

        /**
         * Verifies a GW2C_UpdateFreeStep message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_UpdateFreeStep message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_UpdateFreeStep
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_UpdateFreeStep;

        /**
         * Creates a plain object from a GW2C_UpdateFreeStep message. Also converts values to other types if specified.
         * @param message GW2C_UpdateFreeStep
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_UpdateFreeStep, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_UpdateFreeStep to JSON.
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

    /** Properties of a BigRewardItem. */
    interface IBigRewardItem {

        /** BigRewardItem id */
        id?: (number|null);

        /** BigRewardItem num */
        num?: (number|null);
    }

    /** Represents a BigRewardItem. */
    class BigRewardItem implements IBigRewardItem {

        /**
         * Constructs a new BigRewardItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBigRewardItem);

        /** BigRewardItem id. */
        public id: number;

        /** BigRewardItem num. */
        public num: number;

        /**
         * Creates a new BigRewardItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BigRewardItem instance
         */
        public static create(properties?: msg.IBigRewardItem): msg.BigRewardItem;

        /**
         * Encodes the specified BigRewardItem message. Does not implicitly {@link msg.BigRewardItem.verify|verify} messages.
         * @param message BigRewardItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBigRewardItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BigRewardItem message, length delimited. Does not implicitly {@link msg.BigRewardItem.verify|verify} messages.
         * @param message BigRewardItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBigRewardItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BigRewardItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BigRewardItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BigRewardItem;

        /**
         * Decodes a BigRewardItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BigRewardItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BigRewardItem;

        /**
         * Verifies a BigRewardItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BigRewardItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BigRewardItem
         */
        public static fromObject(object: { [k: string]: any }): msg.BigRewardItem;

        /**
         * Creates a plain object from a BigRewardItem message. Also converts values to other types if specified.
         * @param message BigRewardItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BigRewardItem, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BigRewardItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Sync_BigRewardPickNum. */
    interface ISync_BigRewardPickNum {

        /** Sync_BigRewardPickNum list */
        list?: (msg.IBigRewardItem[]|null);
    }

    /** Represents a Sync_BigRewardPickNum. */
    class Sync_BigRewardPickNum implements ISync_BigRewardPickNum {

        /**
         * Constructs a new Sync_BigRewardPickNum.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ISync_BigRewardPickNum);

        /** Sync_BigRewardPickNum list. */
        public list: msg.IBigRewardItem[];

        /**
         * Creates a new Sync_BigRewardPickNum instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Sync_BigRewardPickNum instance
         */
        public static create(properties?: msg.ISync_BigRewardPickNum): msg.Sync_BigRewardPickNum;

        /**
         * Encodes the specified Sync_BigRewardPickNum message. Does not implicitly {@link msg.Sync_BigRewardPickNum.verify|verify} messages.
         * @param message Sync_BigRewardPickNum message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ISync_BigRewardPickNum, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified Sync_BigRewardPickNum message, length delimited. Does not implicitly {@link msg.Sync_BigRewardPickNum.verify|verify} messages.
         * @param message Sync_BigRewardPickNum message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ISync_BigRewardPickNum, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a Sync_BigRewardPickNum message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Sync_BigRewardPickNum
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.Sync_BigRewardPickNum;

        /**
         * Decodes a Sync_BigRewardPickNum message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Sync_BigRewardPickNum
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.Sync_BigRewardPickNum;

        /**
         * Verifies a Sync_BigRewardPickNum message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Sync_BigRewardPickNum message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Sync_BigRewardPickNum
         */
        public static fromObject(object: { [k: string]: any }): msg.Sync_BigRewardPickNum;

        /**
         * Creates a plain object from a Sync_BigRewardPickNum message. Also converts values to other types if specified.
         * @param message Sync_BigRewardPickNum
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.Sync_BigRewardPickNum, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Sync_BigRewardPickNum to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_UseBagItem. */
    interface IC2GW_UseBagItem {

        /** C2GW_UseBagItem itemid */
        itemid?: (number|null);

        /** C2GW_UseBagItem num */
        num?: (number|null);
    }

    /** Represents a C2GW_UseBagItem. */
    class C2GW_UseBagItem implements IC2GW_UseBagItem {

        /**
         * Constructs a new C2GW_UseBagItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_UseBagItem);

        /** C2GW_UseBagItem itemid. */
        public itemid: number;

        /** C2GW_UseBagItem num. */
        public num: number;

        /**
         * Creates a new C2GW_UseBagItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_UseBagItem instance
         */
        public static create(properties?: msg.IC2GW_UseBagItem): msg.C2GW_UseBagItem;

        /**
         * Encodes the specified C2GW_UseBagItem message. Does not implicitly {@link msg.C2GW_UseBagItem.verify|verify} messages.
         * @param message C2GW_UseBagItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_UseBagItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_UseBagItem message, length delimited. Does not implicitly {@link msg.C2GW_UseBagItem.verify|verify} messages.
         * @param message C2GW_UseBagItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_UseBagItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_UseBagItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_UseBagItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_UseBagItem;

        /**
         * Decodes a C2GW_UseBagItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_UseBagItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_UseBagItem;

        /**
         * Verifies a C2GW_UseBagItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_UseBagItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_UseBagItem
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_UseBagItem;

        /**
         * Creates a plain object from a C2GW_UseBagItem message. Also converts values to other types if specified.
         * @param message C2GW_UseBagItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_UseBagItem, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_UseBagItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_SellBagItem. */
    interface IC2GW_SellBagItem {

        /** C2GW_SellBagItem list */
        list?: (msg.IPairNumItem[]|null);
    }

    /** Represents a C2GW_SellBagItem. */
    class C2GW_SellBagItem implements IC2GW_SellBagItem {

        /**
         * Constructs a new C2GW_SellBagItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_SellBagItem);

        /** C2GW_SellBagItem list. */
        public list: msg.IPairNumItem[];

        /**
         * Creates a new C2GW_SellBagItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_SellBagItem instance
         */
        public static create(properties?: msg.IC2GW_SellBagItem): msg.C2GW_SellBagItem;

        /**
         * Encodes the specified C2GW_SellBagItem message. Does not implicitly {@link msg.C2GW_SellBagItem.verify|verify} messages.
         * @param message C2GW_SellBagItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_SellBagItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_SellBagItem message, length delimited. Does not implicitly {@link msg.C2GW_SellBagItem.verify|verify} messages.
         * @param message C2GW_SellBagItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_SellBagItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_SellBagItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_SellBagItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_SellBagItem;

        /**
         * Decodes a C2GW_SellBagItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_SellBagItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_SellBagItem;

        /**
         * Verifies a C2GW_SellBagItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_SellBagItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_SellBagItem
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_SellBagItem;

        /**
         * Creates a plain object from a C2GW_SellBagItem message. Also converts values to other types if specified.
         * @param message C2GW_SellBagItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_SellBagItem, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_SellBagItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_BuyClothes. */
    interface IC2GW_BuyClothes {

        /** C2GW_BuyClothes itemList */
        itemList?: (number[]|null);
    }

    /** Represents a C2GW_BuyClothes. */
    class C2GW_BuyClothes implements IC2GW_BuyClothes {

        /**
         * Constructs a new C2GW_BuyClothes.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_BuyClothes);

        /** C2GW_BuyClothes itemList. */
        public itemList: number[];

        /**
         * Creates a new C2GW_BuyClothes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_BuyClothes instance
         */
        public static create(properties?: msg.IC2GW_BuyClothes): msg.C2GW_BuyClothes;

        /**
         * Encodes the specified C2GW_BuyClothes message. Does not implicitly {@link msg.C2GW_BuyClothes.verify|verify} messages.
         * @param message C2GW_BuyClothes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_BuyClothes, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_BuyClothes message, length delimited. Does not implicitly {@link msg.C2GW_BuyClothes.verify|verify} messages.
         * @param message C2GW_BuyClothes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_BuyClothes, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_BuyClothes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_BuyClothes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_BuyClothes;

        /**
         * Decodes a C2GW_BuyClothes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_BuyClothes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_BuyClothes;

        /**
         * Verifies a C2GW_BuyClothes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_BuyClothes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_BuyClothes
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_BuyClothes;

        /**
         * Creates a plain object from a C2GW_BuyClothes message. Also converts values to other types if specified.
         * @param message C2GW_BuyClothes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_BuyClothes, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_BuyClothes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_DressClothes. */
    interface IC2GW_DressClothes {

        /** C2GW_DressClothes pos */
        pos?: (number|null);

        /** C2GW_DressClothes itemid */
        itemid?: (number|null);
    }

    /** Represents a C2GW_DressClothes. */
    class C2GW_DressClothes implements IC2GW_DressClothes {

        /**
         * Constructs a new C2GW_DressClothes.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_DressClothes);

        /** C2GW_DressClothes pos. */
        public pos: number;

        /** C2GW_DressClothes itemid. */
        public itemid: number;

        /**
         * Creates a new C2GW_DressClothes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_DressClothes instance
         */
        public static create(properties?: msg.IC2GW_DressClothes): msg.C2GW_DressClothes;

        /**
         * Encodes the specified C2GW_DressClothes message. Does not implicitly {@link msg.C2GW_DressClothes.verify|verify} messages.
         * @param message C2GW_DressClothes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_DressClothes, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_DressClothes message, length delimited. Does not implicitly {@link msg.C2GW_DressClothes.verify|verify} messages.
         * @param message C2GW_DressClothes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_DressClothes, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_DressClothes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_DressClothes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_DressClothes;

        /**
         * Decodes a C2GW_DressClothes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_DressClothes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_DressClothes;

        /**
         * Verifies a C2GW_DressClothes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_DressClothes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_DressClothes
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_DressClothes;

        /**
         * Creates a plain object from a C2GW_DressClothes message. Also converts values to other types if specified.
         * @param message C2GW_DressClothes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_DressClothes, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_DressClothes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_UnDressClothes. */
    interface IC2GW_UnDressClothes {

        /** C2GW_UnDressClothes pos */
        pos?: (number|null);
    }

    /** Represents a C2GW_UnDressClothes. */
    class C2GW_UnDressClothes implements IC2GW_UnDressClothes {

        /**
         * Constructs a new C2GW_UnDressClothes.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_UnDressClothes);

        /** C2GW_UnDressClothes pos. */
        public pos: number;

        /**
         * Creates a new C2GW_UnDressClothes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_UnDressClothes instance
         */
        public static create(properties?: msg.IC2GW_UnDressClothes): msg.C2GW_UnDressClothes;

        /**
         * Encodes the specified C2GW_UnDressClothes message. Does not implicitly {@link msg.C2GW_UnDressClothes.verify|verify} messages.
         * @param message C2GW_UnDressClothes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_UnDressClothes, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_UnDressClothes message, length delimited. Does not implicitly {@link msg.C2GW_UnDressClothes.verify|verify} messages.
         * @param message C2GW_UnDressClothes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_UnDressClothes, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_UnDressClothes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_UnDressClothes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_UnDressClothes;

        /**
         * Decodes a C2GW_UnDressClothes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_UnDressClothes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_UnDressClothes;

        /**
         * Verifies a C2GW_UnDressClothes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_UnDressClothes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_UnDressClothes
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_UnDressClothes;

        /**
         * Creates a plain object from a C2GW_UnDressClothes message. Also converts values to other types if specified.
         * @param message C2GW_UnDressClothes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_UnDressClothes, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_UnDressClothes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_UpdateItemPos. */
    interface IGW2C_UpdateItemPos {

        /** GW2C_UpdateItemPos items */
        items?: (msg.IItemData[]|null);
    }

    /** Represents a GW2C_UpdateItemPos. */
    class GW2C_UpdateItemPos implements IGW2C_UpdateItemPos {

        /**
         * Constructs a new GW2C_UpdateItemPos.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_UpdateItemPos);

        /** GW2C_UpdateItemPos items. */
        public items: msg.IItemData[];

        /**
         * Creates a new GW2C_UpdateItemPos instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_UpdateItemPos instance
         */
        public static create(properties?: msg.IGW2C_UpdateItemPos): msg.GW2C_UpdateItemPos;

        /**
         * Encodes the specified GW2C_UpdateItemPos message. Does not implicitly {@link msg.GW2C_UpdateItemPos.verify|verify} messages.
         * @param message GW2C_UpdateItemPos message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_UpdateItemPos, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_UpdateItemPos message, length delimited. Does not implicitly {@link msg.GW2C_UpdateItemPos.verify|verify} messages.
         * @param message GW2C_UpdateItemPos message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_UpdateItemPos, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_UpdateItemPos message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_UpdateItemPos
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_UpdateItemPos;

        /**
         * Decodes a GW2C_UpdateItemPos message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_UpdateItemPos
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_UpdateItemPos;

        /**
         * Verifies a GW2C_UpdateItemPos message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_UpdateItemPos message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_UpdateItemPos
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_UpdateItemPos;

        /**
         * Creates a plain object from a GW2C_UpdateItemPos message. Also converts values to other types if specified.
         * @param message GW2C_UpdateItemPos
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_UpdateItemPos, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_UpdateItemPos to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_SendShowImage. */
    interface IGW2C_SendShowImage {

        /** GW2C_SendShowImage images */
        images?: (msg.IImageData|null);
    }

    /** Represents a GW2C_SendShowImage. */
    class GW2C_SendShowImage implements IGW2C_SendShowImage {

        /**
         * Constructs a new GW2C_SendShowImage.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_SendShowImage);

        /** GW2C_SendShowImage images. */
        public images?: (msg.IImageData|null);

        /**
         * Creates a new GW2C_SendShowImage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_SendShowImage instance
         */
        public static create(properties?: msg.IGW2C_SendShowImage): msg.GW2C_SendShowImage;

        /**
         * Encodes the specified GW2C_SendShowImage message. Does not implicitly {@link msg.GW2C_SendShowImage.verify|verify} messages.
         * @param message GW2C_SendShowImage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_SendShowImage, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_SendShowImage message, length delimited. Does not implicitly {@link msg.GW2C_SendShowImage.verify|verify} messages.
         * @param message GW2C_SendShowImage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_SendShowImage, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_SendShowImage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_SendShowImage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_SendShowImage;

        /**
         * Decodes a GW2C_SendShowImage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_SendShowImage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_SendShowImage;

        /**
         * Verifies a GW2C_SendShowImage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_SendShowImage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_SendShowImage
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_SendShowImage;

        /**
         * Creates a plain object from a GW2C_SendShowImage message. Also converts values to other types if specified.
         * @param message GW2C_SendShowImage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_SendShowImage, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_SendShowImage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_ChangeImageSex. */
    interface IC2GW_ChangeImageSex {

        /** C2GW_ChangeImageSex sex */
        sex?: (number|null);
    }

    /** Represents a C2GW_ChangeImageSex. */
    class C2GW_ChangeImageSex implements IC2GW_ChangeImageSex {

        /**
         * Constructs a new C2GW_ChangeImageSex.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_ChangeImageSex);

        /** C2GW_ChangeImageSex sex. */
        public sex: number;

        /**
         * Creates a new C2GW_ChangeImageSex instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_ChangeImageSex instance
         */
        public static create(properties?: msg.IC2GW_ChangeImageSex): msg.C2GW_ChangeImageSex;

        /**
         * Encodes the specified C2GW_ChangeImageSex message. Does not implicitly {@link msg.C2GW_ChangeImageSex.verify|verify} messages.
         * @param message C2GW_ChangeImageSex message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_ChangeImageSex, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_ChangeImageSex message, length delimited. Does not implicitly {@link msg.C2GW_ChangeImageSex.verify|verify} messages.
         * @param message C2GW_ChangeImageSex message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_ChangeImageSex, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_ChangeImageSex message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_ChangeImageSex
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_ChangeImageSex;

        /**
         * Decodes a C2GW_ChangeImageSex message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_ChangeImageSex
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_ChangeImageSex;

        /**
         * Verifies a C2GW_ChangeImageSex message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_ChangeImageSex message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_ChangeImageSex
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_ChangeImageSex;

        /**
         * Creates a plain object from a C2GW_ChangeImageSex message. Also converts values to other types if specified.
         * @param message C2GW_ChangeImageSex
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_ChangeImageSex, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_ChangeImageSex to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_RetChangeImageSex. */
    interface IGW2C_RetChangeImageSex {

        /** GW2C_RetChangeImageSex sex */
        sex?: (number|null);
    }

    /** Represents a GW2C_RetChangeImageSex. */
    class GW2C_RetChangeImageSex implements IGW2C_RetChangeImageSex {

        /**
         * Constructs a new GW2C_RetChangeImageSex.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_RetChangeImageSex);

        /** GW2C_RetChangeImageSex sex. */
        public sex: number;

        /**
         * Creates a new GW2C_RetChangeImageSex instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_RetChangeImageSex instance
         */
        public static create(properties?: msg.IGW2C_RetChangeImageSex): msg.GW2C_RetChangeImageSex;

        /**
         * Encodes the specified GW2C_RetChangeImageSex message. Does not implicitly {@link msg.GW2C_RetChangeImageSex.verify|verify} messages.
         * @param message GW2C_RetChangeImageSex message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_RetChangeImageSex, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_RetChangeImageSex message, length delimited. Does not implicitly {@link msg.GW2C_RetChangeImageSex.verify|verify} messages.
         * @param message GW2C_RetChangeImageSex message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_RetChangeImageSex, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_RetChangeImageSex message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_RetChangeImageSex
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_RetChangeImageSex;

        /**
         * Decodes a GW2C_RetChangeImageSex message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_RetChangeImageSex
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_RetChangeImageSex;

        /**
         * Verifies a GW2C_RetChangeImageSex message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_RetChangeImageSex message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_RetChangeImageSex
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_RetChangeImageSex;

        /**
         * Creates a plain object from a GW2C_RetChangeImageSex message. Also converts values to other types if specified.
         * @param message GW2C_RetChangeImageSex
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_RetChangeImageSex, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_RetChangeImageSex to JSON.
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

    /** Properties of a MS2RS_CreateRoom. */
    interface IMS2RS_CreateRoom {

        /** MS2RS_CreateRoom userid */
        userid?: (number|Long|null);

        /** MS2RS_CreateRoom roomid */
        roomid?: (number|Long|null);

        /** MS2RS_CreateRoom gamekind */
        gamekind?: (number|null);

        /** MS2RS_CreateRoom gridnum */
        gridnum?: (number|null);

        /** MS2RS_CreateRoom sidgate */
        sidgate?: (number|null);

        /** MS2RS_CreateRoom quotaflag */
        quotaflag?: (boolean|null);
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

        /** MS2RS_CreateRoom gridnum. */
        public gridnum: number;

        /** MS2RS_CreateRoom sidgate. */
        public sidgate: number;

        /** MS2RS_CreateRoom quotaflag. */
        public quotaflag: boolean;

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

    /** Properties of a RS2MS_UpdateRewardPool. */
    interface IRS2MS_UpdateRewardPool {

        /** RS2MS_UpdateRewardPool mapid */
        mapid?: (number|null);

        /** RS2MS_UpdateRewardPool cost */
        cost?: (number|null);
    }

    /** Represents a RS2MS_UpdateRewardPool. */
    class RS2MS_UpdateRewardPool implements IRS2MS_UpdateRewardPool {

        /**
         * Constructs a new RS2MS_UpdateRewardPool.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRS2MS_UpdateRewardPool);

        /** RS2MS_UpdateRewardPool mapid. */
        public mapid: number;

        /** RS2MS_UpdateRewardPool cost. */
        public cost: number;

        /**
         * Creates a new RS2MS_UpdateRewardPool instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RS2MS_UpdateRewardPool instance
         */
        public static create(properties?: msg.IRS2MS_UpdateRewardPool): msg.RS2MS_UpdateRewardPool;

        /**
         * Encodes the specified RS2MS_UpdateRewardPool message. Does not implicitly {@link msg.RS2MS_UpdateRewardPool.verify|verify} messages.
         * @param message RS2MS_UpdateRewardPool message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRS2MS_UpdateRewardPool, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified RS2MS_UpdateRewardPool message, length delimited. Does not implicitly {@link msg.RS2MS_UpdateRewardPool.verify|verify} messages.
         * @param message RS2MS_UpdateRewardPool message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRS2MS_UpdateRewardPool, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a RS2MS_UpdateRewardPool message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RS2MS_UpdateRewardPool
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.RS2MS_UpdateRewardPool;

        /**
         * Decodes a RS2MS_UpdateRewardPool message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RS2MS_UpdateRewardPool
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.RS2MS_UpdateRewardPool;

        /**
         * Verifies a RS2MS_UpdateRewardPool message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RS2MS_UpdateRewardPool message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RS2MS_UpdateRewardPool
         */
        public static fromObject(object: { [k: string]: any }): msg.RS2MS_UpdateRewardPool;

        /**
         * Creates a plain object from a RS2MS_UpdateRewardPool message. Also converts values to other types if specified.
         * @param message RS2MS_UpdateRewardPool
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RS2MS_UpdateRewardPool, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RS2MS_UpdateRewardPool to JSON.
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

        /** GW2C_MsgNotice face */
        face?: (string|null);

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

        /** GW2C_MsgNotice face. */
        public face: string;

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

    /** Properties of a GW2C_FreePresentNotify. */
    interface IGW2C_FreePresentNotify {

        /** GW2C_FreePresentNotify money */
        money?: (number|null);
    }

    /** Represents a GW2C_FreePresentNotify. */
    class GW2C_FreePresentNotify implements IGW2C_FreePresentNotify {

        /**
         * Constructs a new GW2C_FreePresentNotify.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_FreePresentNotify);

        /** GW2C_FreePresentNotify money. */
        public money: number;

        /**
         * Creates a new GW2C_FreePresentNotify instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_FreePresentNotify instance
         */
        public static create(properties?: msg.IGW2C_FreePresentNotify): msg.GW2C_FreePresentNotify;

        /**
         * Encodes the specified GW2C_FreePresentNotify message. Does not implicitly {@link msg.GW2C_FreePresentNotify.verify|verify} messages.
         * @param message GW2C_FreePresentNotify message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_FreePresentNotify, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_FreePresentNotify message, length delimited. Does not implicitly {@link msg.GW2C_FreePresentNotify.verify|verify} messages.
         * @param message GW2C_FreePresentNotify message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_FreePresentNotify, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_FreePresentNotify message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_FreePresentNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_FreePresentNotify;

        /**
         * Decodes a GW2C_FreePresentNotify message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_FreePresentNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_FreePresentNotify;

        /**
         * Verifies a GW2C_FreePresentNotify message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_FreePresentNotify message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_FreePresentNotify
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_FreePresentNotify;

        /**
         * Creates a plain object from a GW2C_FreePresentNotify message. Also converts values to other types if specified.
         * @param message GW2C_FreePresentNotify
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_FreePresentNotify, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_FreePresentNotify to JSON.
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
}

/** Namespace table. */
declare namespace table {

    /** Properties of a TBallBase. */
    interface ITBallBase {

        /** TBallBase TBall */
        TBall?: (table.ITBallDefine[]|null);
    }

    /** Represents a TBallBase. */
    class TBallBase implements ITBallBase {

        /**
         * Constructs a new TBallBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITBallBase);

        /** TBallBase TBall. */
        public TBall: table.ITBallDefine[];

        /**
         * Creates a new TBallBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TBallBase instance
         */
        public static create(properties?: table.ITBallBase): table.TBallBase;

        /**
         * Encodes the specified TBallBase message. Does not implicitly {@link table.TBallBase.verify|verify} messages.
         * @param message TBallBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITBallBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TBallBase message, length delimited. Does not implicitly {@link table.TBallBase.verify|verify} messages.
         * @param message TBallBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITBallBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TBallBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TBallBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TBallBase;

        /**
         * Decodes a TBallBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TBallBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TBallBase;

        /**
         * Verifies a TBallBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TBallBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TBallBase
         */
        public static fromObject(object: { [k: string]: any }): table.TBallBase;

        /**
         * Creates a plain object from a TBallBase message. Also converts values to other types if specified.
         * @param message TBallBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TBallBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TBallBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TBallDefine. */
    interface ITBallDefine {

        /** TBallDefine Id */
        Id?: (number|null);

        /** TBallDefine Atk */
        Atk?: (number|null);

        /** TBallDefine Price */
        Price?: (number|null);
    }

    /** Represents a TBallDefine. */
    class TBallDefine implements ITBallDefine {

        /**
         * Constructs a new TBallDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITBallDefine);

        /** TBallDefine Id. */
        public Id: number;

        /** TBallDefine Atk. */
        public Atk: number;

        /** TBallDefine Price. */
        public Price: number;

        /**
         * Creates a new TBallDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TBallDefine instance
         */
        public static create(properties?: table.ITBallDefine): table.TBallDefine;

        /**
         * Encodes the specified TBallDefine message. Does not implicitly {@link table.TBallDefine.verify|verify} messages.
         * @param message TBallDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITBallDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TBallDefine message, length delimited. Does not implicitly {@link table.TBallDefine.verify|verify} messages.
         * @param message TBallDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITBallDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TBallDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TBallDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TBallDefine;

        /**
         * Decodes a TBallDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TBallDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TBallDefine;

        /**
         * Verifies a TBallDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TBallDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TBallDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TBallDefine;

        /**
         * Creates a plain object from a TBallDefine message. Also converts values to other types if specified.
         * @param message TBallDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TBallDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TBallDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

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

    /** Properties of a TBirckBase. */
    interface ITBirckBase {

        /** TBirckBase TBirck */
        TBirck?: (table.ITBirckDefine[]|null);
    }

    /** Represents a TBirckBase. */
    class TBirckBase implements ITBirckBase {

        /**
         * Constructs a new TBirckBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITBirckBase);

        /** TBirckBase TBirck. */
        public TBirck: table.ITBirckDefine[];

        /**
         * Creates a new TBirckBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TBirckBase instance
         */
        public static create(properties?: table.ITBirckBase): table.TBirckBase;

        /**
         * Encodes the specified TBirckBase message. Does not implicitly {@link table.TBirckBase.verify|verify} messages.
         * @param message TBirckBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITBirckBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TBirckBase message, length delimited. Does not implicitly {@link table.TBirckBase.verify|verify} messages.
         * @param message TBirckBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITBirckBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TBirckBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TBirckBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TBirckBase;

        /**
         * Decodes a TBirckBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TBirckBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TBirckBase;

        /**
         * Verifies a TBirckBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TBirckBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TBirckBase
         */
        public static fromObject(object: { [k: string]: any }): table.TBirckBase;

        /**
         * Creates a plain object from a TBirckBase message. Also converts values to other types if specified.
         * @param message TBirckBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TBirckBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TBirckBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TBirckDefine. */
    interface ITBirckDefine {

        /** TBirckDefine Id */
        Id?: (number|null);

        /** TBirckDefine High */
        High?: (number|null);

        /** TBirckDefine Wide */
        Wide?: (number|null);
    }

    /** Represents a TBirckDefine. */
    class TBirckDefine implements ITBirckDefine {

        /**
         * Constructs a new TBirckDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITBirckDefine);

        /** TBirckDefine Id. */
        public Id: number;

        /** TBirckDefine High. */
        public High: number;

        /** TBirckDefine Wide. */
        public Wide: number;

        /**
         * Creates a new TBirckDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TBirckDefine instance
         */
        public static create(properties?: table.ITBirckDefine): table.TBirckDefine;

        /**
         * Encodes the specified TBirckDefine message. Does not implicitly {@link table.TBirckDefine.verify|verify} messages.
         * @param message TBirckDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITBirckDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TBirckDefine message, length delimited. Does not implicitly {@link table.TBirckDefine.verify|verify} messages.
         * @param message TBirckDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITBirckDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TBirckDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TBirckDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TBirckDefine;

        /**
         * Decodes a TBirckDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TBirckDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TBirckDefine;

        /**
         * Verifies a TBirckDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TBirckDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TBirckDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TBirckDefine;

        /**
         * Creates a plain object from a TBirckDefine message. Also converts values to other types if specified.
         * @param message TBirckDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TBirckDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TBirckDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TbirckInfobase. */
    interface ITbirckInfobase {

        /** TbirckInfobase TBirckInfo */
        TBirckInfo?: (table.ITBirckInfoDefine[]|null);
    }

    /** Represents a TbirckInfobase. */
    class TbirckInfobase implements ITbirckInfobase {

        /**
         * Constructs a new TbirckInfobase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITbirckInfobase);

        /** TbirckInfobase TBirckInfo. */
        public TBirckInfo: table.ITBirckInfoDefine[];

        /**
         * Creates a new TbirckInfobase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TbirckInfobase instance
         */
        public static create(properties?: table.ITbirckInfobase): table.TbirckInfobase;

        /**
         * Encodes the specified TbirckInfobase message. Does not implicitly {@link table.TbirckInfobase.verify|verify} messages.
         * @param message TbirckInfobase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITbirckInfobase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TbirckInfobase message, length delimited. Does not implicitly {@link table.TbirckInfobase.verify|verify} messages.
         * @param message TbirckInfobase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITbirckInfobase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TbirckInfobase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TbirckInfobase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TbirckInfobase;

        /**
         * Decodes a TbirckInfobase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TbirckInfobase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TbirckInfobase;

        /**
         * Verifies a TbirckInfobase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TbirckInfobase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TbirckInfobase
         */
        public static fromObject(object: { [k: string]: any }): table.TbirckInfobase;

        /**
         * Creates a plain object from a TbirckInfobase message. Also converts values to other types if specified.
         * @param message TbirckInfobase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TbirckInfobase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TbirckInfobase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TBirckInfoDefine. */
    interface ITBirckInfoDefine {

        /** TBirckInfoDefine Id */
        Id?: (number|null);

        /** TBirckInfoDefine Brickid */
        Brickid?: (number|null);

        /** TBirckInfoDefine Info */
        Info?: (string|null);

        /** TBirckInfoDefine Pro */
        Pro?: (number|null);

        /** TBirckInfoDefine Bullet */
        Bullet?: (number|null);

        /** TBirckInfoDefine Time */
        Time?: (number|null);

        /** TBirckInfoDefine kind */
        kind?: (number|null);

        /** TBirckInfoDefine Type */
        Type?: (number|null);
    }

    /** Represents a TBirckInfoDefine. */
    class TBirckInfoDefine implements ITBirckInfoDefine {

        /**
         * Constructs a new TBirckInfoDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITBirckInfoDefine);

        /** TBirckInfoDefine Id. */
        public Id: number;

        /** TBirckInfoDefine Brickid. */
        public Brickid: number;

        /** TBirckInfoDefine Info. */
        public Info: string;

        /** TBirckInfoDefine Pro. */
        public Pro: number;

        /** TBirckInfoDefine Bullet. */
        public Bullet: number;

        /** TBirckInfoDefine Time. */
        public Time: number;

        /** TBirckInfoDefine kind. */
        public kind: number;

        /** TBirckInfoDefine Type. */
        public Type: number;

        /**
         * Creates a new TBirckInfoDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TBirckInfoDefine instance
         */
        public static create(properties?: table.ITBirckInfoDefine): table.TBirckInfoDefine;

        /**
         * Encodes the specified TBirckInfoDefine message. Does not implicitly {@link table.TBirckInfoDefine.verify|verify} messages.
         * @param message TBirckInfoDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITBirckInfoDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TBirckInfoDefine message, length delimited. Does not implicitly {@link table.TBirckInfoDefine.verify|verify} messages.
         * @param message TBirckInfoDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITBirckInfoDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TBirckInfoDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TBirckInfoDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TBirckInfoDefine;

        /**
         * Decodes a TBirckInfoDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TBirckInfoDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TBirckInfoDefine;

        /**
         * Verifies a TBirckInfoDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TBirckInfoDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TBirckInfoDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TBirckInfoDefine;

        /**
         * Creates a plain object from a TBirckInfoDefine message. Also converts values to other types if specified.
         * @param message TBirckInfoDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TBirckInfoDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TBirckInfoDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TBirckItembase. */
    interface ITBirckItembase {

        /** TBirckItembase TBirckItem */
        TBirckItem?: (table.ITBirckItemDefine[]|null);
    }

    /** Represents a TBirckItembase. */
    class TBirckItembase implements ITBirckItembase {

        /**
         * Constructs a new TBirckItembase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITBirckItembase);

        /** TBirckItembase TBirckItem. */
        public TBirckItem: table.ITBirckItemDefine[];

        /**
         * Creates a new TBirckItembase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TBirckItembase instance
         */
        public static create(properties?: table.ITBirckItembase): table.TBirckItembase;

        /**
         * Encodes the specified TBirckItembase message. Does not implicitly {@link table.TBirckItembase.verify|verify} messages.
         * @param message TBirckItembase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITBirckItembase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TBirckItembase message, length delimited. Does not implicitly {@link table.TBirckItembase.verify|verify} messages.
         * @param message TBirckItembase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITBirckItembase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TBirckItembase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TBirckItembase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TBirckItembase;

        /**
         * Decodes a TBirckItembase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TBirckItembase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TBirckItembase;

        /**
         * Verifies a TBirckItembase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TBirckItembase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TBirckItembase
         */
        public static fromObject(object: { [k: string]: any }): table.TBirckItembase;

        /**
         * Creates a plain object from a TBirckItembase message. Also converts values to other types if specified.
         * @param message TBirckItembase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TBirckItembase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TBirckItembase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TBirckItemDefine. */
    interface ITBirckItemDefine {

        /** TBirckItemDefine Id */
        Id?: (number|null);

        /** TBirckItemDefine Name */
        Name?: (string|null);

        /** TBirckItemDefine Num */
        Num?: (number|null);

        /** TBirckItemDefine Pro */
        Pro?: (number|null);
    }

    /** Represents a TBirckItemDefine. */
    class TBirckItemDefine implements ITBirckItemDefine {

        /**
         * Constructs a new TBirckItemDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITBirckItemDefine);

        /** TBirckItemDefine Id. */
        public Id: number;

        /** TBirckItemDefine Name. */
        public Name: string;

        /** TBirckItemDefine Num. */
        public Num: number;

        /** TBirckItemDefine Pro. */
        public Pro: number;

        /**
         * Creates a new TBirckItemDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TBirckItemDefine instance
         */
        public static create(properties?: table.ITBirckItemDefine): table.TBirckItemDefine;

        /**
         * Encodes the specified TBirckItemDefine message. Does not implicitly {@link table.TBirckItemDefine.verify|verify} messages.
         * @param message TBirckItemDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITBirckItemDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TBirckItemDefine message, length delimited. Does not implicitly {@link table.TBirckItemDefine.verify|verify} messages.
         * @param message TBirckItemDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITBirckItemDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TBirckItemDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TBirckItemDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TBirckItemDefine;

        /**
         * Decodes a TBirckItemDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TBirckItemDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TBirckItemDefine;

        /**
         * Verifies a TBirckItemDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TBirckItemDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TBirckItemDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TBirckItemDefine;

        /**
         * Creates a plain object from a TBirckItemDefine message. Also converts values to other types if specified.
         * @param message TBirckItemDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TBirckItemDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TBirckItemDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TbirckRefreshbase. */
    interface ITbirckRefreshbase {

        /** TbirckRefreshbase TBirckRefresh */
        TBirckRefresh?: (table.ITBirckRefreshDefine[]|null);
    }

    /** Represents a TbirckRefreshbase. */
    class TbirckRefreshbase implements ITbirckRefreshbase {

        /**
         * Constructs a new TbirckRefreshbase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITbirckRefreshbase);

        /** TbirckRefreshbase TBirckRefresh. */
        public TBirckRefresh: table.ITBirckRefreshDefine[];

        /**
         * Creates a new TbirckRefreshbase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TbirckRefreshbase instance
         */
        public static create(properties?: table.ITbirckRefreshbase): table.TbirckRefreshbase;

        /**
         * Encodes the specified TbirckRefreshbase message. Does not implicitly {@link table.TbirckRefreshbase.verify|verify} messages.
         * @param message TbirckRefreshbase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITbirckRefreshbase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TbirckRefreshbase message, length delimited. Does not implicitly {@link table.TbirckRefreshbase.verify|verify} messages.
         * @param message TbirckRefreshbase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITbirckRefreshbase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TbirckRefreshbase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TbirckRefreshbase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TbirckRefreshbase;

        /**
         * Decodes a TbirckRefreshbase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TbirckRefreshbase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TbirckRefreshbase;

        /**
         * Verifies a TbirckRefreshbase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TbirckRefreshbase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TbirckRefreshbase
         */
        public static fromObject(object: { [k: string]: any }): table.TbirckRefreshbase;

        /**
         * Creates a plain object from a TbirckRefreshbase message. Also converts values to other types if specified.
         * @param message TbirckRefreshbase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TbirckRefreshbase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TbirckRefreshbase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TBirckRefreshDefine. */
    interface ITBirckRefreshDefine {

        /** TBirckRefreshDefine Id */
        Id?: (number|null);

        /** TBirckRefreshDefine Min */
        Min?: (number|null);

        /** TBirckRefreshDefine Max */
        Max?: (number|null);

        /** TBirckRefreshDefine Pro */
        Pro?: (string|null);

        /** TBirckRefreshDefine Limitnum */
        Limitnum?: (number|null);
    }

    /** Represents a TBirckRefreshDefine. */
    class TBirckRefreshDefine implements ITBirckRefreshDefine {

        /**
         * Constructs a new TBirckRefreshDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITBirckRefreshDefine);

        /** TBirckRefreshDefine Id. */
        public Id: number;

        /** TBirckRefreshDefine Min. */
        public Min: number;

        /** TBirckRefreshDefine Max. */
        public Max: number;

        /** TBirckRefreshDefine Pro. */
        public Pro: string;

        /** TBirckRefreshDefine Limitnum. */
        public Limitnum: number;

        /**
         * Creates a new TBirckRefreshDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TBirckRefreshDefine instance
         */
        public static create(properties?: table.ITBirckRefreshDefine): table.TBirckRefreshDefine;

        /**
         * Encodes the specified TBirckRefreshDefine message. Does not implicitly {@link table.TBirckRefreshDefine.verify|verify} messages.
         * @param message TBirckRefreshDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITBirckRefreshDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TBirckRefreshDefine message, length delimited. Does not implicitly {@link table.TBirckRefreshDefine.verify|verify} messages.
         * @param message TBirckRefreshDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITBirckRefreshDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TBirckRefreshDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TBirckRefreshDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TBirckRefreshDefine;

        /**
         * Decodes a TBirckRefreshDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TBirckRefreshDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TBirckRefreshDefine;

        /**
         * Verifies a TBirckRefreshDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TBirckRefreshDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TBirckRefreshDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TBirckRefreshDefine;

        /**
         * Creates a plain object from a TBirckRefreshDefine message. Also converts values to other types if specified.
         * @param message TBirckRefreshDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TBirckRefreshDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TBirckRefreshDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TEquipBase. */
    interface ITEquipBase {

        /** TEquipBase Equip */
        Equip?: (table.IEquipDefine[]|null);
    }

    /** Represents a TEquipBase. */
    class TEquipBase implements ITEquipBase {

        /**
         * Constructs a new TEquipBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITEquipBase);

        /** TEquipBase Equip. */
        public Equip: table.IEquipDefine[];

        /**
         * Creates a new TEquipBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TEquipBase instance
         */
        public static create(properties?: table.ITEquipBase): table.TEquipBase;

        /**
         * Encodes the specified TEquipBase message. Does not implicitly {@link table.TEquipBase.verify|verify} messages.
         * @param message TEquipBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITEquipBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TEquipBase message, length delimited. Does not implicitly {@link table.TEquipBase.verify|verify} messages.
         * @param message TEquipBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITEquipBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TEquipBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TEquipBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TEquipBase;

        /**
         * Decodes a TEquipBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TEquipBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TEquipBase;

        /**
         * Verifies a TEquipBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TEquipBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TEquipBase
         */
        public static fromObject(object: { [k: string]: any }): table.TEquipBase;

        /**
         * Creates a plain object from a TEquipBase message. Also converts values to other types if specified.
         * @param message TEquipBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TEquipBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TEquipBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EquipDefine. */
    interface IEquipDefine {

        /** EquipDefine Id */
        Id?: (number|null);

        /** EquipDefine Name */
        Name?: (string|null);

        /** EquipDefine Desc */
        Desc?: (string|null);

        /** EquipDefine Pos */
        Pos?: (number|null);

        /** EquipDefine SuitId */
        SuitId?: (number|null);

        /** EquipDefine Sex */
        Sex?: (number|null);

        /** EquipDefine LoadPoint */
        LoadPoint?: (string[]|null);

        /** EquipDefine Path */
        Path?: (string|null);

        /** EquipDefine Skill */
        Skill?: (string[]|null);

        /** EquipDefine Price */
        Price?: (number|null);

        /** EquipDefine CoinType */
        CoinType?: (number|null);

        /** EquipDefine Suit */
        Suit?: (string|null);
    }

    /** Represents an EquipDefine. */
    class EquipDefine implements IEquipDefine {

        /**
         * Constructs a new EquipDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.IEquipDefine);

        /** EquipDefine Id. */
        public Id: number;

        /** EquipDefine Name. */
        public Name: string;

        /** EquipDefine Desc. */
        public Desc: string;

        /** EquipDefine Pos. */
        public Pos: number;

        /** EquipDefine SuitId. */
        public SuitId: number;

        /** EquipDefine Sex. */
        public Sex: number;

        /** EquipDefine LoadPoint. */
        public LoadPoint: string[];

        /** EquipDefine Path. */
        public Path: string;

        /** EquipDefine Skill. */
        public Skill: string[];

        /** EquipDefine Price. */
        public Price: number;

        /** EquipDefine CoinType. */
        public CoinType: number;

        /** EquipDefine Suit. */
        public Suit: string;

        /**
         * Creates a new EquipDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EquipDefine instance
         */
        public static create(properties?: table.IEquipDefine): table.EquipDefine;

        /**
         * Encodes the specified EquipDefine message. Does not implicitly {@link table.EquipDefine.verify|verify} messages.
         * @param message EquipDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.IEquipDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified EquipDefine message, length delimited. Does not implicitly {@link table.EquipDefine.verify|verify} messages.
         * @param message EquipDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.IEquipDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an EquipDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EquipDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.EquipDefine;

        /**
         * Decodes an EquipDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EquipDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.EquipDefine;

        /**
         * Verifies an EquipDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EquipDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EquipDefine
         */
        public static fromObject(object: { [k: string]: any }): table.EquipDefine;

        /**
         * Creates a plain object from an EquipDefine message. Also converts values to other types if specified.
         * @param message EquipDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.EquipDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EquipDefine to JSON.
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

        /** ItemBaseDataDefine Name */
        Name?: (string|null);

        /** ItemBaseDataDefine Desc */
        Desc?: (string|null);

        /** ItemBaseDataDefine Sort */
        Sort?: (number|null);

        /** ItemBaseDataDefine Type */
        Type?: (number|null);

        /** ItemBaseDataDefine Sold */
        Sold?: (number|null);

        /** ItemBaseDataDefine RealPrice */
        RealPrice?: (number|null);
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

        /** ItemBaseDataDefine Name. */
        public Name: string;

        /** ItemBaseDataDefine Desc. */
        public Desc: string;

        /** ItemBaseDataDefine Sort. */
        public Sort: number;

        /** ItemBaseDataDefine Type. */
        public Type: number;

        /** ItemBaseDataDefine Sold. */
        public Sold: number;

        /** ItemBaseDataDefine RealPrice. */
        public RealPrice: number;

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

    /** Properties of a MusicBase. */
    interface IMusicBase {

        /** MusicBase TMusic */
        TMusic?: (table.ITMusicDefine[]|null);
    }

    /** Represents a MusicBase. */
    class MusicBase implements IMusicBase {

        /**
         * Constructs a new MusicBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.IMusicBase);

        /** MusicBase TMusic. */
        public TMusic: table.ITMusicDefine[];

        /**
         * Creates a new MusicBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MusicBase instance
         */
        public static create(properties?: table.IMusicBase): table.MusicBase;

        /**
         * Encodes the specified MusicBase message. Does not implicitly {@link table.MusicBase.verify|verify} messages.
         * @param message MusicBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.IMusicBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified MusicBase message, length delimited. Does not implicitly {@link table.MusicBase.verify|verify} messages.
         * @param message MusicBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.IMusicBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a MusicBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MusicBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.MusicBase;

        /**
         * Decodes a MusicBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MusicBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.MusicBase;

        /**
         * Verifies a MusicBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MusicBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MusicBase
         */
        public static fromObject(object: { [k: string]: any }): table.MusicBase;

        /**
         * Creates a plain object from a MusicBase message. Also converts values to other types if specified.
         * @param message MusicBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.MusicBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MusicBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TMusicDefine. */
    interface ITMusicDefine {

        /** TMusicDefine Id */
        Id?: (number|null);

        /** TMusicDefine Pos */
        Pos?: (string|null);

        /** TMusicDefine Name */
        Name?: (string|null);
    }

    /** Represents a TMusicDefine. */
    class TMusicDefine implements ITMusicDefine {

        /**
         * Constructs a new TMusicDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITMusicDefine);

        /** TMusicDefine Id. */
        public Id: number;

        /** TMusicDefine Pos. */
        public Pos: string;

        /** TMusicDefine Name. */
        public Name: string;

        /**
         * Creates a new TMusicDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TMusicDefine instance
         */
        public static create(properties?: table.ITMusicDefine): table.TMusicDefine;

        /**
         * Encodes the specified TMusicDefine message. Does not implicitly {@link table.TMusicDefine.verify|verify} messages.
         * @param message TMusicDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITMusicDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TMusicDefine message, length delimited. Does not implicitly {@link table.TMusicDefine.verify|verify} messages.
         * @param message TMusicDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITMusicDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TMusicDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TMusicDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TMusicDefine;

        /**
         * Decodes a TMusicDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TMusicDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TMusicDefine;

        /**
         * Verifies a TMusicDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TMusicDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TMusicDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TMusicDefine;

        /**
         * Creates a plain object from a TMusicDefine message. Also converts values to other types if specified.
         * @param message TMusicDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TMusicDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TMusicDefine to JSON.
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

    /** Properties of a TSkillpBase. */
    interface ITSkillpBase {

        /** TSkillpBase TSkill */
        TSkill?: (table.ITSkillDefine[]|null);
    }

    /** Represents a TSkillpBase. */
    class TSkillpBase implements ITSkillpBase {

        /**
         * Constructs a new TSkillpBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITSkillpBase);

        /** TSkillpBase TSkill. */
        public TSkill: table.ITSkillDefine[];

        /**
         * Creates a new TSkillpBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TSkillpBase instance
         */
        public static create(properties?: table.ITSkillpBase): table.TSkillpBase;

        /**
         * Encodes the specified TSkillpBase message. Does not implicitly {@link table.TSkillpBase.verify|verify} messages.
         * @param message TSkillpBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITSkillpBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TSkillpBase message, length delimited. Does not implicitly {@link table.TSkillpBase.verify|verify} messages.
         * @param message TSkillpBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITSkillpBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TSkillpBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TSkillpBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TSkillpBase;

        /**
         * Decodes a TSkillpBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TSkillpBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TSkillpBase;

        /**
         * Verifies a TSkillpBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TSkillpBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TSkillpBase
         */
        public static fromObject(object: { [k: string]: any }): table.TSkillpBase;

        /**
         * Creates a plain object from a TSkillpBase message. Also converts values to other types if specified.
         * @param message TSkillpBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TSkillpBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TSkillpBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TSkillDefine. */
    interface ITSkillDefine {

        /** TSkillDefine Id */
        Id?: (number|null);

        /** TSkillDefine Type */
        Type?: (number|null);

        /** TSkillDefine Num */
        Num?: (number|null);

        /** TSkillDefine NumPer */
        NumPer?: (number|null);

        /** TSkillDefine Des */
        Des?: (string|null);
    }

    /** Represents a TSkillDefine. */
    class TSkillDefine implements ITSkillDefine {

        /**
         * Constructs a new TSkillDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITSkillDefine);

        /** TSkillDefine Id. */
        public Id: number;

        /** TSkillDefine Type. */
        public Type: number;

        /** TSkillDefine Num. */
        public Num: number;

        /** TSkillDefine NumPer. */
        public NumPer: number;

        /** TSkillDefine Des. */
        public Des: string;

        /**
         * Creates a new TSkillDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TSkillDefine instance
         */
        public static create(properties?: table.ITSkillDefine): table.TSkillDefine;

        /**
         * Encodes the specified TSkillDefine message. Does not implicitly {@link table.TSkillDefine.verify|verify} messages.
         * @param message TSkillDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITSkillDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TSkillDefine message, length delimited. Does not implicitly {@link table.TSkillDefine.verify|verify} messages.
         * @param message TSkillDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITSkillDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TSkillDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TSkillDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TSkillDefine;

        /**
         * Decodes a TSkillDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TSkillDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TSkillDefine;

        /**
         * Verifies a TSkillDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TSkillDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TSkillDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TSkillDefine;

        /**
         * Creates a plain object from a TSkillDefine message. Also converts values to other types if specified.
         * @param message TSkillDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TSkillDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TSkillDefine to JSON.
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
}
