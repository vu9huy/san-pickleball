import httpStatus from "http-status";
import { topicServices } from "../services/index.js";
import { catchAsync, filterObject, pick } from "../utils/index.js";
import ApiError from "../../config/errors/ApiError.js";

const createTopic = catchAsync(async (req, res) => {
    const topic = await topicServices.createTopic(req.body);
    res.status(httpStatus.CREATED).send(topic);
});

const getTopic = catchAsync(async (req, res) => {
    const topic = await topicServices.getTopicById(req.params.topicId);
    const isDeleted = topic?.isDeleted;
    if (isDeleted || !topic) {
        throw new ApiError(httpStatus.NOT_FOUND, "Topic not found");
    }
    res.send(topic);
});

const getTopics = catchAsync(async (req, res) => {
    const queryData = pick(req.query, ["name"]);
    const filter = filterObject.topicFilter(queryData);
    const options = pick(req.query, ["sortBy", "limit", "page"]);
    const result = await topicServices.queryTopics(filter, options);
    res.send(result);
});

const updateTopic = catchAsync(async (req, res) => {
    const topic = await topicServices.updateTopic(req.params.topicId, req.body);
    res.send(topic);
});

const deleteTopic = catchAsync(async (req, res) => {
    await topicServices.softDeleteTopicById(req.params.topicId);
    res.status(httpStatus.NO_CONTENT).send();
});

export default {
    createTopic,
    getTopic,
    getTopics,
    updateTopic,
    deleteTopic
};