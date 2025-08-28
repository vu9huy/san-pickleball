import httpStatus from "http-status";
import { Topic } from "../models/index.js";
import { checkIdType } from "../utils/checkIdType.js";
import ApiError from "../../config/errors/ApiError.js";

const createTopic = async (topicData) => {
    return Topic.create(topicData);
};

const queryTopics = async (filter, options) => {
    const topics = await Topic.queryAndPaginate(filter, options);
    return topics;
};

const getAllTopics = async () => {
    const topics = await Topic.find();
    return topics;
};

const getTopicById = async (id) => {
    checkIdType(id);
    const topic = Topic.findById(id);
    return topic;
};

const editTopicById = async (id, topicData) => {
    const topic = await getTopicById(id);
    if (!topic) {
        throw new ApiError(httpStatus.NOT_FOUND, "Topic not found");
    }
    Object.assign(topic, topicData);
    await topic.save();
    return topic;
};


const softDeleteTopicById = async (id) => {
    const topic = await getTopicById(id);
    if (!topic) {
        throw new ApiError(httpStatus.NOT_FOUND, "Topic not found");
    }
    // Soft delete
    Object.assign(topic, { isDeleted: true });
    await topic.save();
    return topic;
};

const hardDeleteTopicById = async (id) => {
    const topic = await getTopicById(id);
    if (!topic) {
        throw new ApiError(httpStatus.NOT_FOUND, "Topic not found");
    }
    await topic.remove();
    return topic;
};

export default {
    createTopic,
    queryTopics,
    getAllTopics,
    getTopicById,
    editTopicById,
    softDeleteTopicById,
    hardDeleteTopicById
};